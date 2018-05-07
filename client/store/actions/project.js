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

const makePostRequest = makeRequest('post', 200);
const makePutRequest = makeRequest('put', 204);

export const persistToDB = (saveObj) => dispatch => {
  const { parent, draft, projectId, userId } = saveObj;
  const id = draft.get('id');
  console.log(projectId, 'projectId');
  console.log(parent, 'parent');
  console.log(saveObj);

  if (saveObj.newCard === true) {
    console.log('incorrect');
    switch(parent.type) {
      //parent is a user, save the project. No need to reload.
      case USER_TYPE:
      dispatch(persistingProject(projectId));
        return axios.put(`api/projects/${id}`, draft)
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
  } else {
    console.log('correct', saveObj);
    switch(parent.type) {
      case PROJECT_TYPE:
      dispatch(persistingProject(projectId));
        return axios.put(`api/projects/${parent.id}/`, draft)
        .then(updated => {
          if (updated.status === 204) {
            dispatch(persistedProject(draft));
            return dispatch(draftSaved());
          } else {
            throw new Error(`Bad Status: ${updated.status}`);
          }
        })
        .catch(err => dispatch(persistingProjectFailure(draft, err)));
      
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


// function makePostRequest(dispatch) {
//   return function(route, userId, projectId, parent, draft){
//   dispatch(persistingProject(projectId));
//       return axios.post(`api/${route}/${parent.id}/`, draft)
//       .then(savedCard => {
//         if (savedCard.status === 200) {
//           return axios.get(`api/projects/${userId}/${projectId}`)
//           .then(reloadedProject => {
//             dispatch(persistedProject(fromJS(reloadedProject.data)));
//             return dispatch(draftSaved());
//           })
//           .catch(err => dispatch(projectLoadError(err, draft)));
//         } else {
//           throw new Error(`Bad Status: ${savedCard.status}`);
//         }
//       })
//       .catch(err => dispatch(persistingProjectFailure(err, draft)));
//   };
// }

function makeRequest(putOrPost, status) {
  return function(dispatch) {
    return function(route, userId, projectId, parent, draft){
  dispatch(persistingProject(projectId));
      return axios[putOrPost](`api/${route}/${parent.id}/`, draft)
      .then(savedCard => {
        if (savedCard.status === status) {
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
  };
}
