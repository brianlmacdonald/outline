'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import NavigationView from 'APP/client/components/HierarchyControl/NavigationViewLoader';
import ReorderView from 'APP/client/components/HierarchyControl/ReorderViewLoader';
import FullView from 'APP/client/components/Graph/FullView.js';
import { logout } from 'APP/client/store/reducers/user';
import { loadUserProjects } from 'APP/client/store/reducers/project';
import reducerRegistry from 'APP/client/store/reducers/ReducerRegistry.js';
import projectReducer from 'APP/client/store/reducers/project';
import navigatorReducer from 'APP/client/store/reducers/navigator';
import orderReducer from 'APP/client/store/reducers/order';
import draftReducer from 'APP/client/store/reducers/draft';
import CardEditor from 'APP/client/components/CardEditor/CardEditorLoader';
import { Notifs } from 'redux-notifications';
import 'redux-notifications/lib/styles.css';
import 'APP/client/components/ProjectOverview/ProjectOverview.css';

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
           <Route exact path={`${match.url}/edit`} render={() => <CardEditor {...this.props} />}/>
           <Route exact path={`${match.url}`} render={() => <NavigationView />}/>
        </Switch>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator,
  draft: state.draft
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
