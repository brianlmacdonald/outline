'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { persistNewOrder } from '../../store/reducers/order';

const typeToRouteObj = {
  ACT_TYPE: 'acts',
  PROJECT_TYPE: 'projects',
  SEQUENCE_TYPE: 'sequences',
  SCENE_TYPE: 'scenes',
  BEAT_TYPE: 'beats'
};


const SaveOrder = (props) => {
  const { type, user, navigator, order, handleSave } = props;
  console.log(type);
  console.log(order);
  const route = typeToRouteObj[type];
  console.log(route);
  const list = order.get(type);
  const projectId = navigator.get('PROJECT_TYPE');
  const userId = user.get('id');
  const orderObj = {
    userId,
    projectId,
    list,
    route,
  };
  return(
    <button
    onClick={() => {
      handleSave(orderObj);
    }}
    >
      save {typeToRouteObj[type]}
    </button>
  );
};

const mapState = state => ({
  order: state.order
});

const mapDispatch = dispatch => ({
  handleSave(orderObject){
    dispatch(persistNewOrder(orderObject));
  }
});

export default connect(mapState, mapDispatch)(SaveOrder);


