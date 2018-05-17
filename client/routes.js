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
      user: null,
      project: null,
      draft: null,
      navigator: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    const {user, project, draft, navigator} = nextProps;
    window.__OUTLINE_STATE__ = {user, project, draft, navigator};
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
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
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
