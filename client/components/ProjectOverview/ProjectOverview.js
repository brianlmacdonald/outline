'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import LoaderHOC from '../HOC/LoaderHOC';
import NavigationView from '../HierarchyControl/NavigationViewLoader';
import ReorderView from '../HierarchyControl/ReorderView';
import FullView from '../Graph/FullView.js';
import { logout } from '../../store/reducers/user';
import { loadUserProjects } from '../../store/reducers/project';
import reducerRegistry from '../../store/reducers/ReducerRegistry.js';
import projectReducer from '../../store/reducers/project';
import navigatorReducer from '../../store/reducers/navigator';
import orderReducer from '../../store/reducers/order';
import draftReducer from '../../store/reducers/draft';
import { Notifs } from 'redux-notifications';
import 'redux-notifications/lib/styles.css';
import './ProjectOverview.css';

class ProjectOverview extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    };
  }

  static getDerivedStateFromProps(nextProps, state){
    const { match } = nextProps;
    if (state.loaded === false && nextProps.user.get('initialLoad') === false) {
      nextProps.handleLoadProjects(nextProps.user.get('id'));
      return {
        loaded: true,
      };
    }
    return null;
  }

  componentDidMount(){
    const { project } = this.props;
    if (project === undefined) {
      reducerRegistry.register('project', projectReducer);
      reducerRegistry.register('navigator', navigatorReducer);
      reducerRegistry.register('draft', draftReducer);
      reducerRegistry.register('order', orderReducer);
    }
  }
  
  render(){
    const { match, handleLogout } = this.props;

    return(
      <div className="overview">
        <nav className='navigation'>
          <ul className='tabs'>
            {location.pathname === '/projects/fullview' && <li className='tab'>print</li>}
            <li className='tab'>
              <Link to={`${match.url}`}>navigator</Link>
            </li>
            <li className='tab'>
              <Link to={`${match.url}/reorder`}>reorder</Link>
            </li>
            <li className='tab'>
              <Link to={`${match.url}/fullview`}>full view</Link>
            </li>
            <li id='userTab' className='tab'>
              <div className='name'>{this.props.user.get('firstName')}</div>
              <div className='logout' onClick={handleLogout}>log out</div>
            </li>
          </ul>
        </nav>
        <Notifs />
        <Switch>
           <Route exact path={`${match.url}/reorder`} render={() => <ReorderView />}/>
           <Route exact path={`${match.url}/fullview`} render={() => <FullView {...this.props} />}/>
           <Route exact path={`${match.url}`} render={() => <NavigationView />}/>
        </Switch>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator
});

const mapDispatch = dispatch => ({
  handleLoadProjects(userId){
    dispatch(loadUserProjects(userId));
  },
  handleLogout(){
    dispatch(logout());
  }
});

const WrappedProjectOverview = LoaderHOC('user')(ProjectOverview);
const ConnectedProjectOverView = withRouter(connect(mapState, mapDispatch)(WrappedProjectOverview));
export default ConnectedProjectOverView;
