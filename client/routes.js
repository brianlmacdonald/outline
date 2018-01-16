import { Router, Route, Switch } from 'react-router-dom'
import browserHistory, { memoryHistory } from './history'
import {Home} from './components/index.jsx'
import React from 'react'

const Routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Router>
)

export default Routes
