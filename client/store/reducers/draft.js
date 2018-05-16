import { Map, List, fromJS } from 'immutable';
import { REMOVE_USER } from './user';

// import store from '../../store';

const NEW_DRAFT_CARD = 'NEW_DRAFT';
const CREATE_CARD_DRAFT_ERROR = 'CREATE_CARD_DRAFT_ERROR';
const UPDATE_CARD = 'UPDATE_CARD';
const DRAFT_CLEARED = 'DRAFT_CLEARED';

//the key names in the card immutable maps.
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

export const createNewDraftCard = card => {
  return {
    type: NEW_DRAFT_CARD,
    payload: card
  };
};

export const errorCreatingDraftCard = (error) => {
  return {
    type: CREATE_CARD_DRAFT_ERROR,
    payload: error
  };
};

export const updateCard = (cardType, value) => {
  return {
    type: UPDATE_CARD,
    payload: {
      cardType,
      value
    }
  };
};

export const discardDraft = () => {
  return {
    type: DRAFT_CLEARED
  };
};

export const draftSaved = () => {
  return {
    type: DRAFT_CLEARED
  };
};
//find
export const createNewDraftCardThunk = (card) => dispatch => {
  try {
    dispatch(createNewDraftCard(card));
  } catch(err) {
    dispatch(errorCreatingDraftCard(err));
  }
  return;
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

const draftReducer = (state = defaultDraft, action) => {

  switch(action.type) {

    case NEW_DRAFT_CARD:
      console.log(action.payload);
      return state.withMutations(map => {
        map.set(CARD_TYPE_ID, action.payload.get(CARD_TYPE_ID))
        .set(CARD_TYPE_TYPE, action.payload.get(CARD_TYPE_TYPE))
        .set(CARD_TYPE_TITLE, action.payload.get(CARD_TYPE_TITLE))
        .set(CARD_TYPE_BODY, action.payload.get(CARD_TYPE_BODY))
        .set(CARD_TYPE_INDEX, action.payload.get(CARD_TYPE_INDEX))
        .set(CARD_TYPE_ACTS, action.payload.get(CARD_TYPE_ACTS))
        .set(CARD_TYPE_SEQUENCES, action.payload.get(CARD_TYPE_SEQUENCES))
        .set(CARD_TYPE_SCENES, action.payload.get(CARD_TYPE_SCENES))
        .set(CARD_TYPE_PARENT, action.payload.get(CARD_TYPE_PARENT))
        .set(CARD_TYPE_BEATS, action.payload.get(CARD_TYPE_BEATS));
      });
    
    case UPDATE_CARD:
      return state.set(action.payload.cardType, action.payload.value);

    case CREATE_CARD_DRAFT_ERROR:
      return state.set('error', action.payload);

    case DRAFT_CLEARED:
      return state.withMutations(map => {
        map.set(CARD_TYPE_ID, null)
        .set(CARD_TYPE_TYPE, null)
        .set(CARD_TYPE_TITLE, null)
        .set(CARD_TYPE_BODY, null)
        .set(CARD_TYPE_INDEX, null)
        .set(CARD_TYPE_ACTS, null)
        .set(CARD_TYPE_SEQUENCES, null)
        .set(CARD_TYPE_SCENES, null)
        .set(CARD_TYPE_BEATS, null);
      });
    
    case REMOVE_USER:
      return state.withMutations(map => {
        map.clear();
        map.set(defaultDraft);
      });
    
    default:
      return state;
  }
};

export default draftReducer;
