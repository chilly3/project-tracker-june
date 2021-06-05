import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { DateTime } from 'luxon';

const User = ({ data }) => {
  const { url, path } = useRouteMatch();
  const { db_users, user } = data;

  

  return (
    <div className="content">
      <div>
        <div>
          <h3 className="content-title">User</h3>
        </div>
      </div>
    </div>
  );
}

export default User;