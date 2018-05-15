'use strict';
import { fromJS } from 'immutable';
import { actions as notifActions } from 'redux-notifications';
import axios from 'axios';
import {
  reloadProject,
  persistingProjectFailure,
  persistingProject,
  persistedProject,
  projectLoadError,
  USER_TYPE,
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  draftSaved
} from '../index';
const { notifSend } = notifActions;

const makePostRequest = makeRequest('post', 200);
const makePutRequest = makeRequest('put', 204);

export const persistToDB = (saveObj) => dispatch => {
  const { parent, draft, projectId, userId } = saveObj;
  const id = draft.get('id');

  if (saveObj.newCard === true) {
    switch(parent.type) {
      case USER_TYPE:
      dispatch(persistingProject(projectId));
        return axios.put(`/api/projects/${id}`, draft)
        .then(updated => {
            dispatch(notifSend({
              message: 'project updated',
              kind: 'info',
              dismissAfter: 2000
            }));
            dispatch(persistedProject(draft));
            return dispatch(draftSaved());
        })
        .catch(err => {
          dispatch(notifSend({
            message: 'project not updated',
            kind: 'error',
            dismissAfter: 3500
          }));
          return dispatch(persistingProjectFailure(draft, err));
        });
      
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
  } else {
    switch(parent.type) {
      case PROJECT_TYPE:
      dispatch(persistingProject(projectId));
        return axios.put(`/api/projects/${parent.id}/`, draft)
        .then(updated => {
          dispatch({
            message: 'project saved',
            kind: 'info',
            dismissAfter: 2000
          });
          dispatch(persistedProject(draft));
          return dispatch(draftSaved());
        })
        .catch(err => {
          dispatch(persistingProjectFailure(draft, err));
          return dispatch(notifSend({
            message: 'project not saved',
            kind: 'error',
            dismissAfter: 3500
          }));
        });
      
      case ACT_TYPE:
      makePutRequest(dispatch)('acts', userId, projectId, parent, draft);
      break;
      
      case SEQUENCE_TYPE:
      makePutRequest(dispatch)('sequences', userId, projectId, parent, draft);
      break;

      case SCENE_TYPE:
      makePutRequest(dispatch)('scenes', userId, projectId, parent, draft);
      break;

      case BEAT_TYPE:
      makePutRequest(dispatch)('beats', userId, projectId, parent, draft);
      break;

      default:
      break;

    }
  }
};

function makeRequest(putOrPost, status) {
  const statusObject = {200: 'created', 204: 'updated'};
  return function(dispatch) {
    return function(route, userId, projectId, parent, draft){
      dispatch(persistingProject(projectId));
      return axios[putOrPost](`/api/${route}/${parent.id}/`, draft)
      .then(savedCard => {
        if (savedCard.status === status) {
          return axios.get(`/api/projects/${userId}/${projectId}`)
          .then(reloadedProject => {
            dispatch(notifSend({
              message: `${route} ${statusObject[status]}`,
              kind: 'info',
              dismissAfter: 2000
            }));
            dispatch(persistedProject(fromJS(reloadedProject.data)));
            return dispatch(draftSaved());
          })
          .catch(err => {
            dispatch(notifSend({
              message: `${route} not loaded`,
              kind: 'error',
              dismissAfter: 3500
            }));
             return dispatch(projectLoadError(err, draft));
            });
        } else {
          throw new Error(`Bad Status: ${savedCard.status}`);
        }
      })
      .catch(err => {
        dispatch(notifSend({
          message: `${route} not ${statusObject[status]}`,
          kind: 'error',
          dismissAfter: 3500
        }));
        return dispatch(persistingProjectFailure(err, draft))
      });
    };
  };
}
