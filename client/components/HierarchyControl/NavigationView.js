'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Container from '../Container/Container';
import InjectContainer from './HierarchyControl';
import LoaderHOC from '../HOC/LoaderHOC';
import ThumbsContainer from '../Container/ThumbsContainer';
import AddNew from '../Container/AddNew';

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
