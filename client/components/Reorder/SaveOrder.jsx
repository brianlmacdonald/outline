'use strict';
import React from 'react';
import { connect } from 'react-redux';

const typeToRouteObj = {
  ACT_TYPE: 'acts',
  PROJECT_TYPE: 'projects',
  SEQUENCE_TYPE: 'sequences',
  SCENE_TYPE: 'scenes',
  BEAT_TYPE: 'beats'
};

const SaveOrder = (props) => {
  const { type, user, navigator, order, handleSave } = props;
  const route = typeToRouteObj[type];
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

export default SaveOrder;
