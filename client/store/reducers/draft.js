import {Map, List, fromJS} from 'immutable';

const NEW_DRAFT = 'NEW_DRAFT';
const UPDATE_PARENT = 'UPDATE_PARENT';
const UPDATE_TYPE = 'UPDATE_TYPE';
const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_BODY = 'UPDATE_BODY';
const UPDATE_INDEX = 'UPDATE_INDEX';
const DRAFT_SAVED = 'DRAFT_SAVED';

export const CARD_TYPE_ID = 'id';
export const CARD_TYPE_TYPE = 'type';
export const CARD_TYPE_TITLE = 'title';
export const CARD_TYPE_BODY = 'body';
export const CARD_TYPE_INDEX = 'index';
export const CARD_TYPE_ACTS = 'acts';
export const CARD_TYPE_SEQUENCES = 'sequences';
export const CARD_TYPE_SCENES = 'scenes';
export const CARD_TYPE_BEATS = 'beats';
export const CARD_TYPE_PARENT = 'parent';

//this is a reminder. Don't do these! Do it from child to parent with type!
const DO_NOT_UPDATE_ACTS = 'DO_NOT_UPDATE_ACTS';
const DO_NOT_UPDATE_SEQUENCES = 'DO_NOT_UPDATE_SEQUENCES';
const DO_NOT_UPDATE_SCENES = 'DO_NOT_UPDATE_SCENES';
const DO_NOT_UPDATE_BEATS = 'DO_NOT_UPDATE_BEATS';

//NEVER NEVER NEVER DO THIS!
const DO_NOT_UPDATE_ID = 'DO_NOT_UPDATE_ID';

export const changeParent = parent => {
  return {
    type: UPDATE_PARENT,
    payload: parent
  };
};

export const changeBody = body => {
  return {
    type: UPDATE_BODY,
    payload: body
  };
};

export const changeIndex = index => {
  return {
    type: UPDATE_INDEX,
    payload: index
  };
};

export const changeTitle = title => {
  return {
    type: UPDATE_TITLE,
    payload: title
  };
};

export const changeType = type => {
  return {
    type: UPDATE_TYPE,
    payload: type
  };
};

const defaultDraft = Map({
  id: null,
  type: null,
  title: null,
  body: null,
  index: null,
  acts: null,
  sequences: null,
  scenes: null,
  beats: null,
  parent: null,
});

const draft = (state = defaultDraft, action) => {

  switch(action.type) {

    case NEW_DRAFT:
      return state.withMutations(map => {
        map.set(CARD_TYPE_ID, action.payload.get(CARD_TYPE_ID))
        .set(CARD_TYPE_TYPE, action.payload.get(CARD_TYPE_TYPE))
        .set(CARD_TYPE_TITLE, action.payload.get(CARD_TYPE_TITLE))
        .set(CARD_TYPE_BODY, action.payload.get(CARD_TYPE_BODY))
        .set(CARD_TYPE_INDEX, action.payload.get(CARD_TYPE_INDEX))
        .set(CARD_TYPE_ACTS, action.payload.get(CARD_TYPE_ACTS))
        .set(CARD_TYPE_SEQUENCES, action.payload.get(CARD_TYPE_SEQUENCES))
        .set(CARD_TYPE_SCENES, action.payload.get(CARD_TYPE_SCENES))
        .set(CARD_TYPE_BEATS, action.payload.get(CARD_TYPE_BEATS));
      });
    
    case UPDATE_PARENT:
      return state.set(CARD_TYPE_PARENT, action.payload);
    
    case UPDATE_INDEX:
      return state.set(CARD_TYPE_INDEX, action.payload);
    
    case UPDATE_BODY:
      return state.set(CARD_TYPE_BODY, action.payload);
    
    case UPDATE_TITLE:
      return state.set(CARD_TYPE_TITLE, action.payload);
    
    case UPDATE_TYPE:
      return state.set(CARD_TYPE_TYPE, action.payload);

    case DRAFT_SAVED:
      return state.clear();
  }
};

export default draft;
