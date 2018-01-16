import { Router, Route, Switch } from 'react-router-dom'
import browserHistory, { memoryHistory } from './history'
import Home from './components/'
import React from 'react'

const routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Router>
)

export default routes
