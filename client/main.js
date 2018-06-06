'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from 'APP/client/store';
import App from 'APP/client/components/App/App';
import ErrorBoundary from 'APP/client/components/ErrorBoundary/ErrorBoundary';
import 'APP/client/main.css';

render(
  <ErrorBoundary>
     <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
  , document.getElementById('start'));
