import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { DateTime } from 'luxon';

const Home = ({ data }) => {
  const { url, path } = useRouteMatch();
  const { db_dailies, db_user, db_user_id, db_user_moment, user, waka_info, waka_dailies, waka_user_moment } = data;
  
  const [home_view, setHome_view] = useState('no_home_update');
  
  console.log(db_user);

  const updateDb_user = () => {
    axios.put(`/db/user/update/${db_user_id}`, waka_info)
    .then((res) => {
      setHome_view('home_user_updated')
    })
    .catch(err => {
      console.log(err)
    })
  }


  const no_home_update = (
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
        <div className="home-last-updated"><i className="alert-dark em">Database database last updated {db_user_moment} </i><button className="button-update-db-user" onClick={updateDb_user}>Update</button></div>
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
        <div className="home-last-updated"><i className="alert-dark em">Last database update {db_user_moment}</i></div>
        <div className="home-dynamics">
        <ul className="v-nav">
          <li className="v-item">Total Logged Time: <i className="alert-success"></i></li>
          <li className="v-item">Daily Records: <i className="alert-success"></i></li>
          <li className="v-item">Projects: <i className="alert-success"></i></li>
          <li className="v-item">Languages:  <i className="alert-success"></i></li>
          <li className="v-item">Dependencies: <i className="alert-success"></i></li>
          <li className="v-item">Preferred OS: <i className="alert-success"></i></li>
          <li className="v-item">Preferred Editor: <i className="alert-success"></i></li>
        </ul>
        </div>
      </div>
      <div>
      </div>
    </div>
  )

  if (home_view === "no_home_update") {
    return <div>{no_home_update}</div>
  } else if (home_view === "home_user_updated") {
    return <div>{home_user_updated}</div>
  }
}

export default Home;