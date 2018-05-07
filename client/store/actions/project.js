'use strict';
import { toJS, fromJS } from 'immutable';
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
  console.log(projectId, 'projectId');

  switch(parent.type) {
    //parent is a user, save the project. No need to reload.
    case USER_TYPE:
    dispatch(persistingProject(projectId));
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
     
     //parent is a project, save the act, reload the project with the act.
    case PROJECT_TYPE:
    makePostRequest(dispatch)('acts', userId, projectId, parent, draft);
    break;
     

    case ACT_TYPE:
    makePostRequest(dispatch)('sequences', userId, projectId, parent, draft);
    break;

    case SEQUENCE_TYPE:
    makePostRequest(dispatch)('scenes', userId, projectId, parent, draft);
    break;

    case SCENE_TYPE:
    makePostRequest(dispatch)('beats', userId, projectId, parent, draft);
    break;

    default:
    break;
  }
};


function makePostRequest(dispatch) {
  return function(route, userId, projectId, parent, draft){
  dispatch(persistingProject(projectId));
      return axios.post(`api/${route}/${parent.id}/`, draft)
      .then(savedCard => {
        if (savedCard.status === 200) {
          return axios.get(`api/projects/${userId}/${projectId}`)
          .then(reloadedProject => {
            dispatch(persistedProject(fromJS(reloadedProject.data)));
            return dispatch(draftSaved());
          })
          .catch(err => dispatch(projectLoadError(err, draft)));
        } else {
          throw new Error(`Bad Status: ${savedCard.status}`);
        }
      })
      .catch(err => dispatch(persistingProjectFailure(err, draft)));
  };
}
