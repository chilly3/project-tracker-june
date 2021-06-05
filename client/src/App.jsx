import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import Home from './components/Home.jsx';
import User from './components/User.jsx';
import { DateTime } from 'luxon';


import user_list from '../../config/data/users.js';

const App = () => {
  const history = useHistory();

  const [app_view, setApp_view] = useState('no_user_selected');
  const [db_users, setDb_users] = useState('');
  const [user, setUser] = useState('');
  const [waka_info, setWaka_info] = useState('');

  const getDb_users = () => {
    axios.get(`/db/user/list`)
  }

  useEffect(() => {
    const reqZero = axios.get(`/db/user/list`)
    axios.all([reqZero])
    .then(axios.spread((...responses) => {
      const resZero = responses[0].data
      setDb_users(resZero)
    }))
    .catch(err => {
      console.log(err)
    })
  },[])

  const formGetWaka_info = (event) => {
    event.preventDefault();
    let range = 'all_time';
    const reqZero = axios.get(`/api/v1/users/${user.id}/${user.auth}`)
    const reqOne = axios.get(`/api/v1/users/${user.id}/stats/${range}/${user.auth}`)
    axios.all([reqZero, reqOne])
    .then(axios.spread((...responses) => {
      const resZero = responses[0].data.data
      const resOne = responses[1].data.data
      console.log(resZero)
      console.log(resOne)
      
      const { created_at, email, id, last_heartbeat_at, last_plugin_name, last_project, photo } = resZero;
      
      const { best_day, days_including_holidays, days_minus_holidays, human_readable_daily_average_including_other_language, human_readable_range, human_readable_total_including_other_language, dependencies, editors, languages, machines, operating_systems, projects } = resOne

      const best = { date: best_day.date, text: best_day.text }

      const dependency = dependencies.map((dependency) => {
        const { name, digital, percent, text } = dependency;

        return {
          name: name,
          digital: digital,
          percent: percent,
          text: text
        }
      })
      const editor = editors.map((editor) => {
        const { name, digital, percent, text } = editor;

        return {
          name: name,
          digital: digital,
          percent: percent,
          text: text
        }
      })
      const language = languages.map((language) => {
        const { name, digital, percent, text } = language;

        return {
          name: name,
          digital: digital,
          percent: percent,
          text: text
        }
      })
      const machine = machines.map((machine) => {
        const { name, digital, percent, text } = machine;

        return {
          name: name,
          digital: digital,
          percent: percent,
          text: text
        }
      })
      const operating_system = operating_systems.map((operating_system) => {
        const { name, digital, percent, text } = operating_system;

        return {
          name: name,
          digital: digital,
          percent: percent,
          text: text
        }
      })
      const project = projects.map((project) => {
        const { name, digital, percent, text } = project;

        return {
          name: name,
          digital: digital,
          percent: percent,
          text: text
        }
      })

      const resMerge = {
        user_id: id,
        email: email,
        start_date: DateTime.fromISO(created_at).toISODate(),
        since_start: human_readable_range,
        total_time: human_readable_total_including_other_language,
        daily_average: human_readable_daily_average_including_other_language,
        last_heartbeat_at: DateTime.fromISO(last_heartbeat_at).toISODate(),
        last_editor_used: last_plugin_name,
        last_project: last_project,
        photo: photo,
        auth: user.auth,
        best_day: best,
        dependencies:  dependency,
        editors: editor,
        languages: language,
        machines: machine,
        operating_systems: operating_system,
        projects: project
      }
      setWaka_info(resMerge)
      setApp_view('user_selected')
    }))
    .catch(err => {
      console.log(err)
    })
  }

  const formSetUser = (event) => {
    event.preventDefault();
    let user_split = event.target.value.split(',');
    let split_e = user_split[0];
    let split_i = user_split[1];
    let split_a = user_split[2];
    let split_s = user_split[3];
    setUser({
      email: split_e,
      id: split_i,
      auth: split_a,
      start: split_s
    })
    setApp_view('form_set')
  }

  let userSelect = user_list.length > 0 && user_list.map((selected, i) => {
    let {email, id, auth, start } = selected;
    return (
      <option key={i} value={Object.values(selected)}>{email}</option>
    )
  }, this);

  const no_user_selected = (
    <div>
      <h1 className="title">Project Tracker June</h1>
      <div className="app-no-user">
      <form className="user-form">
        <label className="user-form-label"><i className="alert-dark strong">Select a user to get started:  </i></label>
        <br></br>
        <select className="user-form-select" onChange={formSetUser}>
          <option>-- users --</option>
          {userSelect}
        </select>
        <button className="user-form-button">Submit</button>
      </form>
    </div>
  </div>
  )

  const form_set = (
    <div>
      <h1 className="title">Project Tracker June</h1>
      <div className="app-no-user">
      <form className="user-form" onSubmit={formGetWaka_info}>
        <label className="user-form-label"><i className="cc-0 strong">{user.email}</i></label>
        <br></br>
        <select className="user-form-select" onChange={formSetUser}>
        <option>-- users --</option>
          {userSelect}
        </select>
        <button className="user-form-button">Submit</button>
      </form>
    </div>
  </div>
  )

  const user_selected = (
    <div>
      <h1 className="title">Project Tracker June</h1>
      <div className="app-user"><i className="cc-0">{user.email}</i></div>
      <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li className="appnav">
              <Link to="/" className="app-link">Home</Link>
            </li>
            <li className="appnav">
              <Link to="/user" className="app-link">User</Link>
            </li>
          </ul>
        </nav>
      <div className="content">
      <Switch>
        <Route exact path="/"><Home data={{ db_users, user, waka_info }}/></Route>
        <Route path="/user"><User data={{ db_users, user, waka_info }}/></Route>
      </Switch>
      </div>
    </div>
  )

  if (app_view === "no_user_selected") {
    return <div>{no_user_selected}</div>
  } else if (app_view === "user_selected") {
    return <div>{user_selected}</div>
  } else if (app_view === "form_set") {
    return <div>{form_set}</div>
  }
}

export default App;