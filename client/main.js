'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import { Notifs } from 'redux-notifications';
import store from './store';
import Routes from './routes';
import './main.css';
import 'redux-notifications/lib/styles.css';

render(
  <Provider store={store}>
    <div>
    <Notifs />
    <Routes />
    </div>
  </Provider>, document.getElementById('start'));
