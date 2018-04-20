'use strict';
import { Router, Route, Switch } from 'react-router-dom';
import browserHistory, { memoryHistory } from './history';
import { 
  UserNav,
  Home,
  Login,
  Signup,
  User,
} from './components/index.jsx';
import React from 'react';

const Routes = () => (
  <Router history={browserHistory}>
    <div>
    <UserNav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path='/user' component={User} />
    </Switch>
    </div>
  </Router>
);

export default Routes;
