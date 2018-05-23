'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Container from '../Container/Container.jsx';
import InjectContainer from './HierarchyControl.jsx';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import ThumbsContainer from '../Container/ThumbsContainer.jsx';
import AddNew from '../Container/AddNew.jsx';

const NavigationView = InjectContainer(Container(AddNew)(ThumbsContainer, true));  

const mapDispatch = dispatch => ({
  handleNavigation(navigationThunk) {
    return function(payload){
      dispatch(navigationThunk(payload));
    };
  },
});

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator,
  draft: state.draft
});

const WrappedNavView = LoaderHOC('project')(NavigationView);
const ConnectedNavView = connect(mapState, mapDispatch)(WrappedNavView);

export default ConnectedNavView;
