'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';
import Routes from './routes';
import './main.css';

render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('start'));
