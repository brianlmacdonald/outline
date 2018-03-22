import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';

//stopped while adding in browserROuter and walking through react-router

import store from './store';
import Routes from './routes';

render(
  <Provider store={store} >
    <Routes />
  </Provider>, document.getElementById('start'));
