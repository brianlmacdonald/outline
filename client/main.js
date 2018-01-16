import React from 'react'
import {render} from 'react-dom'
import {Provider, connect} from 'react-redux'
import { Router, Route, IndexRedirect} from 'react-router'
import {browserRouter} from 'react-router-dom'
import Home from './components/'

//stopped while adding in browserROuter and walking through react-router

import browserHistory, {memoryHistory} from './history'
import store from './store'

render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path='*' component={Home}>
      </Route>
    </Router>
  </Provider>, document.getElementById('start'))
