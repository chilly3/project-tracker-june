import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

const Home = ({ data }) => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { days_match, db_dailies, db_user, db_user_id, db_user_moment, user, waka_info, waka_dailies, waka_user_moment } = data;
  
  const [home_view, setHome_view] = useState(days_match);
  
  const addDb_user = () => {
    axios.post(`/db/user/add`, { users: [waka_info] })
    .then(res => {
      console.log(`User added to database`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const dailies_parse = waka_dailies.map((dailies_parse) => {
    const { grand_total, range, dependencies, editors, languages, machines, operating_systems, projects } = dailies_parse;
    
    const dependency = dependencies.map((dependency) => {
      const { name, digital, percent, text } = dependency;
      
      return { 
        name: name,
        digital: digital,
        text: text,
        percent: percent
      }
    })
    const editor = editors.map((editor) => {
      const { name, digital, percent, text } = editor;

      return {
        name: name,
        digital: digital,
        text: text,
        percent: percent
      }
    })
    const language = languages.map((language) => {
      const { name, digital, percent, text } = language;

      return {
        name: name,
        digital: digital,
        text: text,
        percent: percent
      }
    })
    const machine = machines.map((machine) => {
      const { name, digital, percent, text } = machine;

      return {
        name: name,
        digital: digital,
        text: text,
        percent: percent
      }
    })
    const operating_system = operating_systems.map((operating_system) => {
      const { name, digital, percent, text } = operating_system;

      return {
        name: name,
        digital: digital,
        text: text,
        percent: percent
      }
    })
    const project = projects.map((project) => {
      const { name, digital, percent, text } = project;

      return {
        name: name,
        digital: digital,
        text: text,
        percent: percent
      }
    })

    return {
      waka_id: db_user.user_id,
      date: range.date,
      grand_total: grand_total,
      dependencies: dependency,
      editors: editor,
      languages: language,
      machines: machine,
      operating_systems: operating_system,
      projects: project
    }
  })

  const addDb_dailies = () => {

    const reqZero = axios.post(`/db/daily/add/${db_user_id}`, dailies_parse)
    const reqOne = axios.put(`/db/user/update/${db_user_id}`, waka_info)

    axios.all([reqZero, reqOne])
    .then(axios.spread((...responses) => {
      const resZero = responses[0];
      const resOne = responses[1];
      setHome_view('home_user_updated')
    }))
    .catch(err => {
      console.log(err)
    })
  }

  const updateDb_user = () => {
    const reqZero = axios.put(`/db/user/update/${db_user_id}`, waka_info)
    const reqOne = axios.post(`/db/daily/update/${db_user_id}`, dailies_parse)
    axios.all([reqZero, reqOne])
    .then(axios.spread((...responses) => {
      const resZero = responses[0]
      const resOne = responses[1]
      setHome_view('update_user_dailies')
    }))
    .catch(err => {
      console.log(err)
    })
  }
  const add_user_dailies = (
    <div>
    <hr></hr>
    <div>
      <h3 className="content-title">Home</h3>
      <p>Welcome to Project Tracker Database, a basic website built with react, express, and mongoose for keeping track of coding projects.</p>
      <div className="home-dynamics">
      <ul className="v-nav">
        <li className="v-item">Total Logged Time: <i className="alert-success">{db_user.total_time}</i></li>
        <li className="v-item">Daily Records: <i className="alert-danger"></i></li>
        <li className="v-item">Projects: <i className="alert-danger"></i></li>
        <li className="v-item">Languages:  <i className="alert-danger"></i></li>
        <li className="v-item">Dependencies: <i className="alert-danger"></i></li>
        <li className="v-item">Preferred OS: <i className="alert-info">{db_user.operating_systems[0].name}</i></li>
        <li className="v-item">Preferred Editor: <i className="alert-info">{db_user.editors[0].name}</i></li>
      </ul>
      </div>
      <div className="home-last-updated"><i className="alert-danger em strong">Database contains no dailies for this user </i><button className="button-update-db-user" onClick={addDb_dailies}>Add</button></div>
    </div>
    <div>
    </div>
  </div>
  )

  const update_user_dailies = (
    <div>
      <hr></hr>
      <div>
        <h3 className="content-title">Home</h3>
        <p>Welcome to Project Tracker Database, a basic website built with react, express, and mongoose for keeping track of coding projects.</p>
        <div className="home-dynamics">
        <ul className="v-nav">
          <li className="v-item">Total Logged Time: <i className="alert-success">{db_user.total_time}</i></li>
          <li className="v-item">Daily Records: <i className="alert-danger">{db_user.total_dailies}</i></li>
          <li className="v-item">Projects: <i className="alert-danger">{db_user.projects.length}</i></li>
          <li className="v-item">Languages:  <i className="alert-danger">{db_user.languages.length}</i></li>
          <li className="v-item">Dependencies: <i className="alert-danger">{db_user.dependencies.length}</i></li>
          <li className="v-item">Preferred OS: <i className="alert-info">{db_user.operating_systems[0].name}</i></li>
          <li className="v-item">Preferred Editor: <i className="alert-info">{db_user.editors[0].name}</i></li>
        </ul>
        </div>
        <div className="home-last-updated"><i className="alert-dark em">Database last updated {db_user_moment} </i><button className="button-update-db-user" onClick={updateDb_user}>Update</button></div>
      </div>
      <div>
      </div>
    </div>
  )

  const home_user_updated = (
    <div>
      <hr></hr>
      <div>
        <h3 className="content-title">Home</h3>
        <p>Welcome to Project Tracker Database, a basic website built with react, express, and mongoose for keeping track of coding projects.</p>
        <div className="home-dynamics">
        <ul className="v-nav">
          <li className="v-item">Total Logged Time: <i className="alert-success">{db_user.total_time}</i></li>
          <li className="v-item">Daily Records: <i className="alert-danger">{db_user.total_dailies}</i></li>
          <li className="v-item">Projects: <i className="alert-danger">{db_user.projects.length}</i></li>
          <li className="v-item">Languages:  <i className="alert-danger">{db_user.languages.length}</i></li>
          <li className="v-item">Dependencies: <i className="alert-danger">{db_user.dependencies.length}</i></li>
          <li className="v-item">Preferred OS: <i className="alert-info">{db_user.operating_systems[0].name}</i></li>
          <li className="v-item">Preferred Editor: <i className="alert-info">{db_user.editors[0].name}</i></li>
        </ul>
        </div>
        <div className="home-last-updated"><i className="alert-dark em">Database last updated {db_user_moment} </i></div>
      </div>
      <div>
      </div>
    </div>
  )

  if (home_view === "update_user_dailies") {
    return <div>{update_user_dailies}</div>
  } else if (home_view === "add_user_dailies") {
    return <div>{add_user_dailies}</div>
  } else if (home_view === "home_user_updated") {
    return <div>{home_user_updated}</div>
  }
}

export default Home;