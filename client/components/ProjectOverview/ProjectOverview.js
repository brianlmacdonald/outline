'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import NavigationView from 'APP/client/components/HierarchyControl/NavigationViewLoader';
import ReorderView from 'APP/client/components/HierarchyControl/ReorderViewLoader';
import FullView from 'APP/client/components/Graph/FullView.js';
import CardEditor from 'APP/client/components/CardEditor/CardEditorLoader';
import { logout } from 'APP/client/store/reducers/user';
import { loadUserProjects } from 'APP/client/store/reducers/project';
import reducerRegistry from 'APP/client/store/reducers/ReducerRegistry.js';
import projectReducer from 'APP/client/store/reducers/project';
import navigatorReducer from 'APP/client/store/reducers/navigator';
import orderReducer from 'APP/client/store/reducers/order';
import draftReducer from 'APP/client/store/reducers/draft';
import { Notifs } from 'redux-notifications';
import 'redux-notifications/lib/styles.css';
import 'APP/client/components/ProjectOverview/ProjectOverview.css';
import 'bulma/css/bulma.css';
import { tourConnect } from 'APP/client/components/TourGuide/TourGuide';
import projectOverviewConfig from 'APP/client/components/ProjectOverview/TourConfig';

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
    const { match, handleLogout, tour } = this.props;

    return(
      <section className='section'>
        <nav className='navbar is-fixed-top is-dark'>
          <div className='navbar-brand'>
          </div>
          <div className='navbar-menu'>
            <div id='nav-left' className='navbar-start navbar-tabs'>
                <div id='cardview' className='navbar-tab-item'>
                  <Link to={`${match.url}`}>card view</Link>
                </div>
                <div id='fullview' className='navbar-tab-item'>
                   <Link to={`${match.url}/fullview`}>full view</Link>
                </div>
                <div id='reorder' className='navbar-tab-item'>
                  <Link to={`${match.url}/reorder`}>reorder</Link>
                </div>
            </div>
            <div id='nav-right' className='navbar-end'>
              <span
              className='navbar-tab-item'
                onClick={tour}
                id='help'>
                <a>help</a>
              </span>
              <span id='userTab' className='navbar-item has-dropdown is-hoverable'>
                <a className='navbar-link'>{this.props.user.get('firstName')}</a>
                <div className='navbar-dropdown'>
                <a className='navbar-item' onClick={handleLogout}>log out</a>
                </div>
              </span>
            </div>
          </div>
        </nav>
        <Notifs />
        <Switch>
           <Route exact path={`${match.url}/reorder`} render={() => <ReorderView {...this.props} />}/>
           <Route exact path={`${match.url}/fullview`} render={() => <FullView {...this.props} />}/>
           <Route exact path={`${match.url}/edit`} render={() => <CardEditor {...this.props} />}/>
           <Route exact path={`${match.url}`} render={() => <NavigationView {...this.props} />}/>
        </Switch>
      </section>

    );
  }
}

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator,
  draft: state.draft,
  order: state.order
});

const mapDispatch = dispatch => ({
  handleLoadProjects(userId){
    dispatch(loadUserProjects(userId));
  },
  handleLogout(){
    dispatch(logout());
  },
  handleNavigation(navigationThunk) {
    return function(payload){
      dispatch(navigationThunk(payload));
    };
  },
});

const WrappedProjectOverview = LoaderHOC('user')(tourConnect(projectOverviewConfig)(ProjectOverview));
const ConnectedProjectOverView = withRouter(connect(mapState, mapDispatch)(WrappedProjectOverview));
export default ConnectedProjectOverView;
