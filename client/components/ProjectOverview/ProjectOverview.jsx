'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import HierarchyControl from '../HierarchyControl/HierarchyControlLoader.jsx';
import { loadUserProjects } from '../../store/reducers/project';
import reducerRegistry from '../../store/reducers/ReducerRegistry.js';
import project from '../../store/reducers/project';
import navigator from '../../store/reducers/navigator';
import draft from '../../store/reducers/draft';
import { Notifs } from 'redux-notifications';
import 'redux-notifications/lib/styles.css';

//this will eventually be a visualization component for the entire story.
//hierachy view is more of an organization for editing. 
//project/overview vs project/edit

class ProjectOverview extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      user: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state){
    if (state.user !== nextProps.user.get('id')) {
      const id = nextProps.user.get('id') || '';
      if (id !== '') nextProps.handleLoadProjects(nextProps.user.get('id'));
      return {
        user: id
      };
    }
    return null;
  }

  componentDidMount(){
    const { user, projects, handleLoadProjects } = this.props;
    if (!this.state.loaded) {
      reducerRegistry.register('project', project);
      reducerRegistry.register('navigator', navigator);
      reducerRegistry.register('draft', draft);
      this.setState({loaded: true});
    }
  }

  render(){
    const { user } = this.props;

    return(
      <div>
        <Notifs />
        <HierarchyControl />
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
