import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

const Projects = ({ data }) => {
    const { url, path } = useRouteMatch();
    const history = useHistory();

    return (
        <div>
          <hr></hr>
            <div>
              <h3 className="content-title">Projects</h3>
            </div>
          <div>
          </div>
        </div>
      );
    }
    
    export default Projects;