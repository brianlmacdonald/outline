'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Container from 'APP/client/components/Container/Container';
import ReorderContainer from 'APP/client/components/Reorder/ReorderContainer';
import InjectContainer from 'APP/client/components/HierarchyControl/HierarchyControl';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import SaveOrder from 'APP/client/components/Reorder/SaveOrder';
import { persistNewOrder } from 'APP/client/store/reducers/order';
import { createNewDraftCard } from 'APP/client/store/reducers/draft';
import { changeParent } from 'APP/client/store/actions/changeParent';
import { updateOrder } from 'APP/client/store/reducers/order';

const ReorderView = InjectContainer(Container(SaveOrder)(ReorderContainer));  

const mapDispatch = dispatch => ({
  handleSave(orderObject){
      dispatch(persistNewOrder(orderObject));
  },
  handleHotSeat(card){
    dispatch(createNewDraftCard(card));
  },
  handleOrder(updateObj){
		dispatch(updateOrder(updateObj));
	},
	handleChangeParent(updateObj){
		dispatch(changeParent(updateObj));
	}
});

const WrappedReorderView = LoaderHOC('project')(ReorderView);
const ConnectedReorderView = connect(null, mapDispatch)(WrappedReorderView);

export default ConnectedReorderView;
