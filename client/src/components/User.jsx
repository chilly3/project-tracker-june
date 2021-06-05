import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

const User = ({ data }) => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { db_user, db_users, db_user_id, db_user_moment, user, waka_info, waka_user_moment } = data;
  
  const [user_view, setUser_view] = useState('not_updated');
  const [user_db_info, setUser_db_info] = useState('');

  useEffect(() => {
    axios.get(`/db/user/${db_user_id}`)
    .then(({ data } = res) => {
      console.log(data)
      setUser_db_info(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const addUser = () => {
    axios.post(`/db/user/add`, { users: [waka_info] })
    .then(res => {
      console.log(`User added to database`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const updateUser = () => {
    axios.put(`/db/user/update/${db_user_id}`, waka_info)
    .then((res) => {
      history.push({ pathname: '/user' })
      setUser_view('user_updated')
    })
    .catch(err => {
      console.log(err)
    })
  }
  console.log(user);
  const not_updated = (
    <div>
      <div>
      <hr></hr>
        <h2 className="content-title">User</h2>
        <p><i className="alert-dark em smaller">Last activity: {waka_user_moment}</i></p>
        <p><i className="alert-dark em smaller">Last updated: {db_user_moment}</i></p>
        <p>Would you like to update user?</p>
        <button className="update-user-button" onClick={updateUser}>Update</button>
        <br></br>
        <img src={db_user.photo} alt="user-photo" className="user-photo" />
        <p><i className="alert-dark strong">Email: </i>{user.email}</p>
        <p><i className="alert-dark strong">Total time: </i><i className="alert-success em strong">{db_user.total_time}</i></p>
        <div>
        </div>
      </div>
  </div>
  )

  const user_updated = (
    <div>
      <div>
      <hr></hr>
        <h2 className="content-title">User</h2>
        <p><i className="alert-dark em smaller">Last updated: </i><i className="alert-success em strong">{db_user_moment}</i></p>
        <br></br>
        <img src={db_user.photo} alt="user-photo" className="user-photo" />
        <p><i className="alert-dark strong">Email: </i>{user.email}</p>
        <p><i className="alert-dark strong">Total time: </i><i className="alert-success em strong">{user_db_info.total_time}</i></p>
        <div>
        </div>
      </div>
    </div>
  )

  console.log(user_view);

  if (user_view === "not_updated") {
    return <div>{not_updated}</div>
  } else if (user_view === "user_updated") {
    return <div>{user_updated}</div>
  }
}

export default User;