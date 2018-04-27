'use strict';
import { toJS } from 'immutable';
import axios from 'axios';
import {
  persistingProjectFailure,
  persistingProject,
  persistedProject
} from '../index';

export const persistProjectToDB = (saveObj) => dispatch => {
  const {userId, card} = saveObj;
  const id = card.get('id');
  
  dispatch(persistingProject(card));
  return axios.put(`api/projects/update/${userId}/${id}`, card)
  .then(status => dispatch(persistedProject(card)))
  .catch(err => dispatch(persistingProjectFailure(card, err)));
};
