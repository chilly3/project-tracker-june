import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { DateTime } from 'luxon';

const Home = ({ data }) => {
  const { url, path } = useRouteMatch();

  return (
    <div>
      <div>
        <div>
          <h3 className="content-title">Home</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;