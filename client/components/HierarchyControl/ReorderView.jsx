'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Container from '../Container/Container.jsx';
import ReorderContainer from '../Reorder/ReorderContainer.jsx';
import InjectContainer from './HierarchyControl.jsx';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import SaveOrder from '../Reorder/SaveOrder.jsx';
import { persistNewOrder } from '../../store/reducers/order';

const ReorderView = InjectContainer(Container(SaveOrder)(ReorderContainer));  

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

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator,
  order: state.order
});

const WrappedReorderView = LoaderHOC('project')(ReorderView);
const ConnectedReorderView = connect(mapState, mapDispatch)(WrappedReorderView);

export default ConnectedReorderView;
