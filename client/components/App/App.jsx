'use strict';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import browserHistory, { memoryHistory } from '../../history';
import UserNav from '../UserNav/UserNav.jsx';
import Home from '../Home/Home.jsx';
import { Login, Signup } from '../Auth.jsx';
import ProjectOverview from '../ProjectOverview/ProjectOverviewLoader.jsx';
import React, { Component }  from 'react';
import './App.css';

class APP extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state){
    const {user, project, draft, navigator, order} = nextProps;
    const forStorage = { user, project, draft, navigator, order};
    //for reducer registry. When a new reducer is add, the current state 
    //will be passed to the combine and register reducers fn from __OUTLINE_STATE__
    if (state.user !== nextProps.user.get('id')) {
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
    const isLoggedIn = !!this.state.user;
    const { user } = this.props;
    return(
      <div className='app'>
      <Router history={browserHistory}>
        <div className='routes'>
          <UserNav />
          <Switch>
            <Route exact path="/" render={() => <Home user={user} />} />
            <Route path="/login" render={() => (
              !isLoggedIn ? (<Login />) : (
                <Redirect to='/projects' />
              
            ))} />
            <Route path="/signup" render={() => (
              !isLoggedIn ? (<Signup />) : (
                <Redirect to='/projects' />
              
            ))} />
            <Route path='/projects' render={() => (
              isLoggedIn ? (<ProjectOverview />) : (
              <Redirect to='/login'/>
            ))} />
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
  order: state.order
});

const connectedRoutes = connect(mapState)(APP);

export default connectedRoutes;
