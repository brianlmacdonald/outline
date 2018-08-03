'use strict';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import browserHistory, { memoryHistory } from 'APP/client/history';
import Home from 'APP/client/components/Home/Home';
import Login from 'APP/client/components/Auth/LoginLoader';
import Signup from 'APP/client/components/Auth/SignupLoader';
import ProjectOverview from 'APP/client/components/ProjectOverview/ProjectOverviewLoader';
import React, { Component }  from 'react';
import AuthenticatedRoute from 'APP/client/components/Authenticated/AuthenticatedRoute';
import 'APP/client/components/App/App.css';
import 'bulma/css/bulma.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state){
    const {user, project, draft, navigator, order, search } = nextProps;
    const forStorage = { user, project, draft, navigator, order, search };
    //for reducer registry. When a new reducer is added, the current state 
    //will be passed to the combine and register reducers fn from __OUTLINE_STATE__
    if (nextProps.user && state.user !== nextProps.user.get('id')) {
      if (nextProps.user.get('id') === undefined) {
        delete window.__OUTLINE_STATE__;
        return {
          user: ''
        };
      } else {
        window.__OUTLINE_STATE__ = forStorage;
        return {
          user: nextProps.user.get('id')
        };
      }
    }
    window.__OUTLINE_STATE__ = forStorage;
    return null;
  }

  componentWillUnMount(){
    delete window.__OUTLINE_STATE__;
  }
  
  render() {
    const { user } = this.props;
    
    return(
      <div className='app'>
      <Router history={browserHistory}>
      <div className='routes'>
        <nav className='navbar is-fixed-top is-dark' />
          <Switch>
            <Route exact path="/" render={() => <Home user={user} />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/signup" render={() => <Signup />} />
            <AuthenticatedRoute
              {...this.props}
              path='/projects'
              component={ProjectOverview} />
            <Route path='*' render={(props) => {
              return <div>{`url '${props.match.url}' not found.`}</div>;
            }} />
          </Switch>
        </div>
    </Router>
  </div>);
  }
}

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator,
  draft: state.draft,
  order: state.order,
  search: state.search
});

const connectedRoutes = connect(mapState)(App);

export default connectedRoutes;
