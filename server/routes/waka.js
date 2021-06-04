const async = require('async');
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();
router.use(bodyParser.json());

const wakatime_api = require('../../config/waka.config');
///USER API ROUTES///

///USER API ROUTES///

//GET all logged time
router.get('/users/:userid/all_time_since_today/:auth', (req, res) => {
  let userid = req.params.userid;
  let auth = req.params.auth;
  let authorization = wakatime_api[auth];

  axios({
    url: `/api/v1/users/${userid}/all_time_since_today`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
    console.log(data.data.text);
  })
  .catch(err => console.log(err));
});

//GET user information
router.get('/users/:userid/:auth', (req, res) => {
  let userid = req.params.userid;
  let auth = req.params.auth;
  let authorization = wakatime_api[auth];
  axios({
    url: `/api/v1/users/${userid}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});

//GET stats for range (stats per period)
router.get('/users/:userid/stats/:range/:auth', (req, res) => {
  let range = req.params.range;
  let userid = req.params.userid;
  let auth = req.params.auth;
  let authorization = wakatime_api[auth];

  axios({
    url: `/api/v1/users/${userid}/stats/${range}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});


//GET summaries for range (time per period) for UPDATING dailies
router.get('/users/:userid/summaries/:start/:end/:auth', (req, res) => {
  let start = req.params.start;
  let end = req.params.end;
  let userid = req.params.userid;
  let auth = req.params.auth;
  let authorization = wakatime_api[auth];

  axios({
    url: `/api/v1/users/${userid}/summaries?start=${start}&end=${end}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});

//GET summaries for range (time per period) for USER STATS PAGE
router.get('/users/:userid/summaries/:range/:auth', (req, res) => {
  let range = req.params.range;
  let userid = req.params.userid;
  let auth = req.params.auth;
  let authorization = wakatime_api[auth];

  axios({
    url: `/api/v1/users/${userid}/summaries?range=${range}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});

///PROJECT API ROUTES///

//GET projects for userid
router.get('/users/:userid/projects/:auth', (req, res) => {
  let userid = req.params.userid;
  let auth = req.params.auth;
  let authorization = wakatime_api[auth];

  axios({
    url: `/api/v1/users/${userid}/projects`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});

//GET total time for project
router.get('/users/:userid/all_time_since_today/:project/:auth', (req, res) => {
  let userid = req.params.userid;
  let project = req.params.project;
  let auth = req.params.auth;
  let authorization = wakatime_api[auth];

  axios({
    url: `/api/v1/users/${userid}/all_time_since_today?project=${project}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});

module.exports = router;