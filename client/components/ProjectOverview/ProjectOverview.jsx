'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import NavigationView from '../HierarchyControl/NavigationViewLoader.jsx';
import ReorderView from '../HierarchyControl/ReorderViewLoader.jsx';
import { loadUserProjects } from '../../store/reducers/project';
import reducerRegistry from '../../store/reducers/ReducerRegistry.js';
import project from '../../store/reducers/project';
import navigator from '../../store/reducers/navigator';
import order from '../../store/reducers/order';
import draft from '../../store/reducers/draft';
import { Notifs } from 'redux-notifications';
import 'redux-notifications/lib/styles.css';

class ProjectOverview extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      loaded: false,
      navigation: true
    };
    this.toggleNavigation = this.toggleNavigation.bind(this);
  }

  static getDerivedStateFromProps(nextProps, state){
    if (state.loaded === false && nextProps.user.get('initialLoad') === false) {
      nextProps.handleLoadProjects(nextProps.user.get('id'));
      return {
        loaded: true
      };
    }
    return null;
  }

  componentDidMount(){
    const { user, projects, handleLoadProjects } = this.props;
    if (projects === undefined) {
      reducerRegistry.register('project', project);
      reducerRegistry.register('navigator', navigator);
      reducerRegistry.register('draft', draft);
      reducerRegistry.register('order', order);
    }
  }

  toggleNavigation(){
    this.setState({navigation: !this.state.navigation});
  }

  render(){
    const { user } = this.props;

    return(
      <div>
        <nav>
          <button
          onClick={this.toggleNavigation}
          >{this.state.navigation ? 'edit order' : 'edit card'}</button>
        </nav>
        <Notifs />
        {this.state.navigation ? <NavigationView /> : <ReorderView />}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  projects: state.projects
});

const mapDispatch = dispatch => ({
  handleLoadProjects(userId){
    dispatch(loadUserProjects(userId));
  }
});

const WrappedProjectOverview = LoaderHOC('user')(ProjectOverview);
const ConnectedProjectOverView = connect(mapState, mapDispatch)(WrappedProjectOverview);
export default ConnectedProjectOverView;
