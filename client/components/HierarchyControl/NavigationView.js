'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Container from 'APP/client/components/Container/Container';
import InjectContainer from 'APP/client/components/HierarchyControl/HierarchyControl';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import ThumbsContainer from 'APP/client/components/Container/ThumbsContainer';
import AddNew from 'APP/client/components/Container/AddNew';

const NavigationView = InjectContainer(Container(AddNew)(ThumbsContainer, true));  

const mapDispatch = dispatch => ({
  handleNavigation(navigationThunk) {
    return function(payload){
      dispatch(navigationThunk(payload));
    };
  },
});

const WrappedNavView = LoaderHOC('project')(NavigationView);
const ConnectedNavView = connect(null, mapDispatch)(WrappedNavView);

export default ConnectedNavView;
