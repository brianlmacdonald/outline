'use strict';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import browserHistory, { memoryHistory } from './history';
import UserNav from './components/UserNav/UserNav.jsx';
import Home from './components/Home.jsx';
import { Login, Signup } from './components/Auth.jsx';
import ProjectOverview from './components/ProjectOverview/ProjectOverviewLoader.jsx';
import React, { Component }  from 'react';

class Routes extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
    };
  }
  //I don't like this here. Find a better way to spy on state.
  static getDerivedStateFromProps(nextProps, state){
    const {user, project, draft, navigator} = nextProps;
    const forStorage = { user, project, draft, navigator}
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
    const { user } = this.props;
    const isLoggedIn = user.get('id') !== undefined;
    return(
      <Router history={browserHistory}>
        <div className='routes'>
          <UserNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" render={() => (
              !isLoggedIn ? (<Login />) : (
                <Redirect to='/projects' />
              
            ))} />
            <Route path="/signup" render={() => (
              !isLoggedIn ? (<SignUp />) : (
                <Redirect to='/projects' />
              
            ))} />
            <Route path='/projects' render={() => (
              isLoggedIn ? (<ProjectOverview />) : (
              <Redirect to='/login'/>
            ))} />
          </Switch>
        </div>
    </Router>);
  }
}

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator,
  draft: state.draft
});

const connectedRoutes = connect(mapState)(Routes);

export default connectedRoutes;
