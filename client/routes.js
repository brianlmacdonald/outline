'use strict';
import { Router, Route, Switch } from 'react-router-dom';
import browserHistory, { memoryHistory } from './history';
import { 
  Home,
  Login,
  Signup,
  Editor,
  ControlPanel,
} from './components/index.jsx';
import React from 'react';

const Routes = () => (
  <Router history={browserHistory}>
    <div>
    <ControlPanel />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path='/editor' component={Editor} />
    </Switch>
    </div>
  </Router>
);

export default Routes;
