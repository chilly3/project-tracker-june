import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

const User = ({ data }) => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { db_users, db_user_id, db_user_moment, user, waka_info, waka_user_moment } = data;
  
  const [user_view, setUser_view] = useState('not_updated');
  const [db_user, setDb_user] = useState('');
  const [last_activity, setLast_activity] = useState('');
  const [user_db_info, setUser_db_info] = useState('');


  useEffect(() => {
    const reqZero = axios.get(`/db/user/${db_user_id}`)
    axios.all([reqZero])
    .then(axios.spread((...responses) => {
      const resZero = responses[0].data

      let activity = DateTime.fromISO(resZero.last_heartbeat_at).ts;
      let ago = DateTime.now().ts - activity;
      let db_user_update_moment = DateTime.now().minus(ago).toRelative();

      setDb_user(resZero)
      setLast_activity(db_user_update_moment)
    }))
    .catch(err => {
      console.log(err)
    })
  },[])
  return (
    <div>
      <hr></hr>
        <div>
          <h3 className="content-title">User</h3>
          <img src={db_user.photo} alt="user-photo" className="user-photo" />
          <p><i className="alert-dark strong">Email: </i>{db_user.email}</p>
          <p className="alert-dark"><strong>Last activity: </strong><i className="alert-info">{db_user.last_project}  </i>
          <small className="alert-muted"><em>{last_activity}</em></small></p>
          <p className="alert-dark"><strong>Total activity: </strong>
          <i className="alert-success"> {db_user.total_time}</i><i className="alert-muted">, {db_user.since_start}</i></p>
        </div>
      <div>
      </div>
    </div>
  );
}

export default User;