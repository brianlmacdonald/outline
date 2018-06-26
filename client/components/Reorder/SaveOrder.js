'use strict';
import React from 'react';
import { connect } from 'react-redux';
import 'APP/client/components/Reorder/ReorderContainer.css';

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
  if (type === 'PROJECT_TYPE') return <div />;
  return(
    <div className='with-padding'>
      <button
        className='box index-card unselected flex'
        onClick={() => {
          handleSave(orderObj);
        }}>save {typeToRouteObj[type]}
      </button>
    </div>
  );
};

export default SaveOrder;
