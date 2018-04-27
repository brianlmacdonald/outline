'use strict';
import { toJS } from 'immutable';
import axios from 'axios';
import {
  errorSavingDraft,
  draftSaved,
  savingDraft
} from '../index';

export const persistProject = (payload) => dispatch => {
  const {userId, projectId, card} = payload;
  return axios.put(`api/projects/${userId}/${projectId}`, toJS(card))
  .then(res => {
    console.log(res);
  })
  .catch(err => )
}