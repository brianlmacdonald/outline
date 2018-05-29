'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';
import App from './components/App/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './main.css';

render(
  <ErrorBoundary>
     <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
  , document.getElementById('start'));
