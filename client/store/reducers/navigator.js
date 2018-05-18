import { Map } from 'immutable';
import { REMOVE_USER } from './user';

const ADD_PATH = 'ADD_PATH';
const DELETE_PATH = 'DELETE_PATH';
const CLEAR_PATHS = 'CLEAR_PATHS';

import {
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  loadSingleProject
} from './project.js';

export const clearNavigation = () => ({
  type: CLEAR_PATHS
});

export const addNavigationPath = (type, id) => ({
  type: ADD_PATH,
  payload: { id, type }
});

export const removeNavigationPath = type => ({
  type: DELETE_PATH,
  payload: type
});

export const projectNavigation = payload => dispatch => {
  dispatch(removeNavigationPath(BEAT_TYPE));
  dispatch(removeNavigationPath(SCENE_TYPE));
  dispatch(removeNavigationPath(SEQUENCE_TYPE));
  dispatch(removeNavigationPath(ACT_TYPE));
  dispatch(loadSingleProject(payload.userId, payload.id));
};

export const actNavigation = payload => dispatch => {
  dispatch(removeNavigationPath(BEAT_TYPE));
  dispatch(removeNavigationPath(SCENE_TYPE));
  dispatch(removeNavigationPath(SEQUENCE_TYPE));
  dispatch(addNavigationPath(ACT_TYPE, payload.id));
};

export const sequenceNavigation = payload => dispatch => {
  dispatch(removeNavigationPath(BEAT_TYPE));
  dispatch(removeNavigationPath(SCENE_TYPE));
  dispatch(addNavigationPath(SEQUENCE_TYPE, payload.id));
};

export const sceneNavigation = payload => dispatch => {
  dispatch(removeNavigationPath(BEAT_TYPE));
  dispatch(addNavigationPath(SCENE_TYPE, payload.id));
};

export const beatNavigation = payload => dispatch => {
  dispatch(addNavigationPath(BEAT_TYPE, payload.id));
};



const defaultNav = Map({
  PROJECT_TYPE: null,
  ACT_TYPE: null,
  SEQUENCE_TYPE: null,
  SCENE_TYPE: null,
  BEAT_TYPE: null
});

const reducerName = 'navigator';

const navigatorReducer = (state = defaultNav, action) => {

  switch (action.type) {
    case ADD_PATH:
      return state.set(action.payload.type, action.payload.id);

    case DELETE_PATH:
      return state.set(action.payload, null);

    case CLEAR_PATHS:
      return state.withMutations(map => {
        map.set(PROJECT_TYPE, null);
        map.set(ACT_TYPE, null);
        map.set(SEQUENCE_TYPE, null);
        map.set(SCENE_TYPE, null);
        map.set(BEAT_TYPE, null);
      });

    default:
      return state;
  }
};

export default navigatorReducer;
