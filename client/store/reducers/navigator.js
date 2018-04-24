import { Map } from "immutable";

const ADD_PATH = "ADD_PATH";
const DELETE_PATH = "DELETE_PATH";

export const addNavigationPath = (type, id) => ({
  type: ADD_PATH,
  payload: { id, type }
});

export const removeNavigationPath = type => ({
  type: DELETE_PATH,
  payload: type
});

const defaultState = Map({
  project: null,
  act: null,
  sequence: null,
  scene: null,
  beat: null
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
