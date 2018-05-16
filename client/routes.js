'use strict';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import browserHistory, { memoryHistory } from './history';
import { 
  UserNav,
  Home,
  Login,
  Signup,
  ProjectOverview,
} from './components/index.jsx';
import React, { Component }  from 'react';

class Routes extends Component {
  constructor(props){
    super(props);
  }

  getDerivedStateFromProps(nextProps, prevState){
    const {user, project, draft, navigator} = nextProps;
    sessionStorage.setItem('outline', {user, project, draft, navigator});
  }

  componentWillUnMount(){
    sessionStorage.clear();
  }
  
  render() {
    return(
      <Router history={browserHistory}>
        <div className='routes'>
          <UserNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path='/projects' component={ProjectOverview} />
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

export default Routes;
