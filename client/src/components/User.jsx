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


  return (
    <div>
      <hr></hr>
        <div>
          <h3 className="content-title">User</h3>
        </div>
      <div>
      </div>
    </div>
  );
}

export default User;