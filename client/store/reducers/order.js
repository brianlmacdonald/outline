'use strict';
import { List, Map, fromJS } from 'immutable';
import axios from 'axios';
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;
import { loadSingleProject, persistingProject, persistedProject } from './project';

const UPDATE_ORDER = 'UPDATE_ORDER';
const ORDER_ERROR = 'ORDER_ERROR';
const CLEAR_ORDER = 'CLEAR_ORDER';

export const updateOrder = updateObject => ({
  type: UPDATE_ORDER,
  payload: updateObject
});

const updateOrderError = err => ({
  type: ORDER_ERROR,
  payload: err
});

const onlyChangedIndices = list => {
  const changed = [];
  list.forEach((card, idx) => {
    if (card.get('index') !== idx) changed.push(card.set('index', idx));
  });
  return changed;
};

export const persistNewOrder = orderObj => dispatch => {
  const { list, route, userId, projectId } = orderObj;
  dispatch(persistingProject(projectId));
  const bulkUpdate = onlyChangedIndices(list).map(card => {
    const id = card.get('id');
    return axios.put(`/api/${route}/${id}`, card)
    .then(updateSuccess => updateSuccess)
    .catch(err => err);
  });
  return Promise.all(bulkUpdate)
  .then(successfulUpdate => {
    return axios.get(`/api/projects/${userId}/${projectId}`)
    .then(updatedProject => {
      dispatch(notifSend({
      message: `${route} order updated`,
      kind: 'info',
      dismissAfter: 2000
      }));
      return dispatch(persistedProject(fromJS(updatedProject.data)));
    })
    .catch(err => {
      dispatch(notifSend({
        message: `${route} not loaded`,
        kind: 'danger',
        dismissAfter: 3500
      }));
      });
  })
  .catch(err => {
    dispatch(updateOrderError(err));
    dispatch(notifSend({
      message: 'error updating index',
      kind: 'danger',
      dismissAfter: 3000
    }));
  });
};

const defaultOrder = Map({
  ACT_TYPE: List([]),
  SEQUENCE_TYPE: List([]),
  SCENE_TYPE: List([]),
  BEAT_TYPE: List([])
});

const orderReducer = (state = defaultOrder, action) => {

  switch(action.type){

    case UPDATE_ORDER:
    return state.set(action.payload.type, action.payload.list);

    case ORDER_ERROR:
    return state.set('error', action.payload);

    case CLEAR_ORDER:
    return state;
    default:
    return state;
  }
};

export default orderReducer;
