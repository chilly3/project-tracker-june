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
  const [days_match, setDays_match] = useState('');
  const [db_dailies, setDb_dailies] = useState('');
  const [db_user_id, setDb_user_id] = useState('');
  const [db_user_moment, setDb_user_moment] = useState('');
  const [db_user, setDb_user] = useState('');
  const [db_users, setDb_users] = useState('');
  const [user_model_ids, setUser_model_ids] = useState('');
  const [user, setUser] = useState('');
  const [waka_info, setWaka_info] = useState('');
  const [waka_dailies, setWaka_dailies] = useState('');
  const [waka_user_moment, setWaka_user_moment] = useState('');

  const getDb_users = () => {
    axios.get(`/db/user/list`)
  }

  useEffect(() => {
    const reqZero = axios.get(`/db/user/list`)
    axios.all([reqZero])
    .then(axios.spread((...responses) => {
      const resZero = responses[0].data
      let db_ids = {};

      const item = resZero.map((item) => {
        const email = item.email;
        const model_id = item._id;

        db_ids[email] = model_id;
      })

      setDb_users(resZero)
      setUser_model_ids(db_ids)
    }))
    .catch(err => {
      console.log(err)
    })
  },[])

  const formGetWaka_info = (event) => {
    event.preventDefault();
    const range = 'all_time';
    const model_id = user_model_ids[user.email];
    const end_range = DateTime.now().toISODate();

    const reqZero = axios.get(`/api/v1/users/${user.id}/${user.auth}`)
    const reqOne = axios.get(`/api/v1/users/${user.id}/stats/${range}/${user.auth}`)
    const reqTwo = axios.get(`/api/v1/users/${user.id}/summaries/${user.start}/${end_range}/${user.auth}`)
    const reqThree = axios.get(`/db/daily/list/${model_id}`)
    const reqFour = axios.get(`/db/user/${model_id}`)

    axios.all([reqZero, reqOne, reqTwo, reqThree, reqFour])
    .then(axios.spread((...responses) => {
      const resZero = responses[0].data.data
      const resOne = responses[1].data.data
      const resTwo = responses[2].data.data
      const resThree = responses[3].data
      const resFour = responses[4].data
      
      const { created_at, email, id, last_heartbeat_at, last_plugin_name, last_project, photo } = resZero;

      let activity = DateTime.fromISO(resFour.last_update).ts;
      let ago = DateTime.now().ts - activity;
      let db_user_update_moment = DateTime.now().minus(ago).toRelative();

      let waka_activity = DateTime.fromISO(resZero.last_heartbeat_at).ts;
      let waka_ago = DateTime.now().ts - waka_activity;
      let waka_user_update_moment = DateTime.now().minus(waka_ago).toRelative();

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
        total_dailies: days_including_holidays,
        last_heartbeat_at: last_heartbeat_at,
        last_heartbeat_at_date: DateTime.fromISO(last_heartbeat_at).toISODate(),
        last_update: DateTime.now(),
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
      const db_days = resThree.length;
      const waka_days = resTwo.length;
      let days_condition;

      if (db_days && db_days === waka_days) {
        days_condition = "home_user_updated";
      } else if (db_days < 1) {
        days_condition = "add_user_dailies";
      } else if (db_days !== waka_days) {
        days_condition = "update_user_dailies";
      }

      setDays_match(days_condition)
      setWaka_info(resMerge)
      setWaka_dailies(resTwo)
      setWaka_user_moment(waka_user_update_moment)
      setDb_dailies(resThree)
      setDb_user_moment(db_user_update_moment)
      setDb_user(resFour)
      setDb_user_id(model_id)
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
    let at_index = split_e.indexOf('@');
    let handle = split_e.slice(0, at_index);
    setUser({
      email: split_e,
      id: split_i,
      auth: split_a,
      start: split_s,
      handle: handle
    })
    setApp_view('form_set')
  }

  let userSelect = user_list.length > 0 && user_list.map((selected, i) => {
    let {email, id, auth, start } = selected;
    return (
      <option key={i} value={Object.values(selected)}>{email}</option>
    )
  }, this);

  const change_user = () => {
    setApp_view('no_user_selected')
  }

  const no_user_selected = (
    <div>
      <h1 className="title">Project Tracker June</h1>
      <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li className="appnav">
              <Link to="/" className="app-link">Home</Link>
            </li>
          </ul>
        </nav>
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
      <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li className="appnav">
              <Link to="/" className="app-link">Home</Link>
            </li>
          </ul>
        </nav>
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
      <div className="change-user-div"><button className="change-user-button" onClick={change_user}>Switch User</button></div>
      <h2 className="title">Project Tracker June<br></br><i className="sub-title cc-0 smaller">{user.handle}</i></h2>
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
        <Route exact path="/"><Home data={{ days_match, db_dailies, db_user, db_users, db_user_id, db_user_moment, user, waka_info, waka_dailies, waka_user_moment }}/></Route>
        <Route path="/user"><User data={{ db_dailies, db_user, db_users, db_user_id, db_user_moment, user, waka_info, waka_dailies, waka_user_moment }}/></Route>
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