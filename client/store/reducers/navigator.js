import { Map } from 'immutable';

const ADD_PATH = 'ADD_PATH';
const DELETE_PATH = 'DELETE_PATH';

export const PROJECT_NAV = 'PROJECT_NAV';
export const ACT_NAV = 'ACT_NAV';
export const SEQUENCE_NAV = 'SEQUENCE_NAV';
export const SCENE_NAV = 'SCENE_NAV';
export const BEAT_NAV = 'BEAT_NAV';


export const addNavigationPath = (type, id) => ({
  type: ADD_PATH,
  payload: { id, type }
});

export const removeNavigationPath = type => ({
  type: DELETE_PATH,
  payload: type
});

const defaultState = Map({
  PROJECT_NAV: null,
  ACT_NAV: null,
  SEQUENCE_NAV: null,
  SCENE_NAV: null,
  BEAT_NAV: null
});

const navigator = (state = defaultState, action) => {

  switch (action.type) {
    case ADD_PATH:
      return state.set(action.payload.type, action.payload.id);

    case DELETE_PATH:
      return state.set(action.payload, null);

    default:
      return state;
  }
};

export default navigator;
