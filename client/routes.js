import { Router, Route, Switch } from 'react-router-dom';
import browserHistory, { memoryHistory } from './history';
import { Home, Login, Signup } from './components/index.jsx';
import React from 'react';

const Routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </Router>
);

export default Routes;
