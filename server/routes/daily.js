const async = require('async');
const bodyParser = require('body-parser');
const express = require('express');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');
const Daily = require('../models/daily');

const router = express.Router();
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

///DAILY DATABASE ROUTES///

//POST request add dailys
router.post('/add/:dbuser', (req, res, next) => {
  const postDailies = req.body;
  const dbuser = req.params.dbuser;
  let bulkOps = [];
  for (var i = 0; i < postDailies.length; i++) {
    let current = postDailies[i];
    let daily = new Daily({ user: dbuser });
    let upsertDoc = {
      "insertOne": {
        "document": {
          "waka_id": current.waka_id,
          "date": current.date,
          "grand_total": current.grand_total,
          "dependencies": current.dependencies,
          "editors": current.editors,
          "languages": current.languages,
          "machines": current.machines,
          "operating_systems": current.operating_systems,
          "projects": current.projects,
          "user": daily.user
        }
      }
    }
    bulkOps.push(upsertDoc);
  }
  try {
    Daily.collection.bulkWrite(bulkOps);
    return res.status(200).send(`add dailies success`)
  } catch {
  res.status(404).send({ error: `Can not complete add dailies request` })
  }
});

//POST request to update array of dailies/ or add new ones if they do not exist
router.post('/update/:dbuser', (req, res, next) => {
  const dbuser = req.params.dbuser;
  const postDailies = req.body;
  let bulkOps = [];
  for (var i = 0; i < postDailies.length; i++) {
    let current = postDailies[i];
    let daily = new Daily({ user: dbuser });
    let upsertDoc = {
      "updateOne": {
        "filter": { "waka_id": current.waka_id, "date": current.date },
        "update": { 
          "$set": current,
          "$setOnInsert": { "user": daily.user }
         },
        "upsert": true
      }
    };
    bulkOps.push(upsertDoc);
  }
  try {
    Daily.collection.bulkWrite(bulkOps);
    return res.status(200).send(`update dailies success`)
  } catch {
    res.status(404).send({ error: `Can not complete request` })
  }
});

//GET request for all dailys for a given user
router.get('/list/:dbuser', async(req, res) => {
  try {
    const user_dailies = await Daily.find({ user: req.params.dbuser });
    return res.status(200).send(user_dailies);
  } catch {
    res.status(404).send({ error: "Can not complete update dailies request" })
  }
})

//GET request for list of all dailys
router.get('/list', async (req, res) => {
  try {
    const days = await Daily.find();
    return res.status(200).send(days);
  } catch {
    res.status(404).send({ error: "Can not complete daily list request" })
  }
});

//GET request for individual daily
router.get('/:id', async (req, res) => {
  console.log(req.params);
  try {
    const day = await Daily.findOne({ _id: req.params.id });
    return res.status(200).send(day);
  } catch {
    res.status(404).send({ error: "Day not listed in the database" })
  }
});

//DELETE request for all user's dailies
router.delete('/remove/:id', async (req, res) => {
  let db_id = req.params.id;
  Daily.deleteMany({ user: db_id }, (err, _) => {
    if (err) {
      return console.error(err);
    } else {
      res.status(201).send(`Deleted dailies for user: ${db_id}`)
      console.log(`Multiple documents for ${db_id} removed from Daily collection`)
    }
  })
})


module.exports = router;