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
  BEAT_TYPE
} from '../index';

export const persistProjectToDB = (saveObj) => dispatch => {
  const {userId, card} = saveObj;
  const id = card.get('id');
  
  dispatch(persistingProject(card));
  return axios.put(`api/projects/update/${userId}/${id}`, card)
  .then(status => dispatch(persistedProject(card)))
  .catch(err => dispatch(persistingProjectFailure(card, err)));
};
