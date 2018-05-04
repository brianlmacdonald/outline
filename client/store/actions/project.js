'use strict';
import { toJS } from 'immutable';
import axios from 'axios';
import store, {
  reloadProject,
  persistingProjectFailure,
  persistingProject,
  persistedProject,
  projectLoadError,
  USER_TYPE,
  CARD_TYPE_TYPE,
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  draftSaved
} from '../index';

export const persistToDB = (saveObj) => dispatch => {
  const { parent, draft, projectId, userId } = saveObj;
  const id = draft.get('id');

  switch(parent.type) {
    case USER_TYPE:
    dispatch(persistingProject(draft));
      return axios.put(`api/projects/update/${parent.id}/${id}`, draft)
      .then(updated => {
        if (updated.status === 204) {
          dispatch(persistedProject(draft));
          return dispatch(draftSaved());
        } else {
          throw new Error(`Bad Status: ${updated.status}`);
        }
      })
      .catch(err => dispatch(persistingProjectFailure(draft, err)));
     
     case PROJECT_TYPE:
     dispatch(persistingProject(draft));
      return axios.post(`api/acts/save/${parent.id}/${id}`, draft)
      .then(updated => {
        if (updated.status === 204) {
          return axios.get(`api/projects/${projectId}/${userId}`, draft)
          .then(reloadedProject => {
            dispatch(persistedProject(reloadedProject.data));
            return dispatch(draftSaved());
          })
          .catch(err => dispatch(projectLoadError(draft, err)));
        } else {
          throw new Error(`Bad Status: ${updated.status}`);
        }
      })
      .catch(err => dispatch(persistingProjectFailure(draft, err)));
  }
};
