'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Container from 'APP/client/components/Container/Container';
import ReorderContainer from 'APP/client/components/Reorder/ReorderContainer';
import InjectContainer from 'APP/client/components/HierarchyControl/HierarchyControl';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import SaveOrder from 'APP/client/components/Reorder/SaveOrder';
import { persistNewOrder } from 'APP/client/store/reducers/order';

const ReorderView = InjectContainer(Container(SaveOrder)(ReorderContainer, false));  

const mapDispatch = dispatch => ({
  handleNavigation(navigationThunk) {
    return function(payload){
      dispatch(navigationThunk(payload));
    };
  },
    handleSave(orderObject){
      dispatch(persistNewOrder(orderObject));
    }
});

const WrappedReorderView = LoaderHOC('project')(ReorderView);
const ConnectedReorderView = connect(null, mapDispatch)(WrappedReorderView);

export default ConnectedReorderView;
