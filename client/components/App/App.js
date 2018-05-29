'use strict';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import browserHistory, { memoryHistory } from '../../history';
import Home from '../Home/Home';
import { Login, Signup } from '../Auth';
import ProjectOverview from '../ProjectOverview/ProjectOverview';
import React, { Component }  from 'react';
import AuthenticatedRoute from '../Authenticated/AuthenticatedRoute';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state){
    const {user, project, draft, navigator, order} = nextProps;
    const forStorage = { user, project, draft, navigator, order};
    //for reducer registry. When a new reducer is added, the current state 
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
    const { user } = this.props;
    
    return(
      <div className='app'>
      <Router history={browserHistory}>
        <div className='routes'>
          <Switch>
            <Route exact path="/" render={() => <Home user={user} />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/signup" render={() => <Signup />} />
            <AuthenticatedRoute {...this.props} path='/projects' component={ProjectOverview} />
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
  order: state.order
});

const connectedRoutes = connect(mapState)(App);

export default connectedRoutes;
