const async = require('async');
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

let app = express();
let port = 8080;

//Models
const User = require('./models/user');
const Daily = require('./models/daily');

//Routes
  //db
const user_routes = require('./routes/user');
const daily_routes = require('./routes/daily');

  //api
const waka_routes = require('./routes/waka');

app.use('/db/user', user_routes);
app.use('/db/daily', daily_routes);

app.use('/api/v1', waka_routes);

//Mongoose
const mongoDB = require('../config/mongo_atlas.config');
mongoose.connect(mongoDB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }))
app.use(express.static(__dirname + '/../client/dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});