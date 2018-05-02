'use strict';
import { toJS } from 'immutable';
import axios from 'axios';
import store, {
  persistingProjectFailure,
  persistingProject,
  persistedProject,
  CARD_TYPE_TYPE,
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  draftSaved
} from '../index';

export const persistProjectToDB = (saveObj) => dispatch => {
  const {userId, card} = saveObj;
  const id = card.get('id');
  
  dispatch(persistingProject(card));
  return axios.put(`api/projects/update/${userId}/${id}`, card)
  .then(updated => {
    if (updated.status === 204) {
      dispatch(persistedProject(card));
      return dispatch(draftSaved());
    } else {
      throw new Error(`Bad Status: ${updated.status}`);
    }
  })
  .catch(err => dispatch(persistingProjectFailure(card, err)));
};
