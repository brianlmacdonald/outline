'use strict';
import axios from 'axios';
import { fromJS } from 'immutable';
import { projectLoadError } from '../reducers/project';
import {
  USER_TYPE,
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  deletingProject,
  projectDeleted,
  projectDeletionError,
  loadUserProjects,
  clearNavigation
} from '../index.js';

export const CARD_DELETE_REQUEST = 'CARD_DELETE_REQUEST';
export const CARD_DELETE_SUCCESS = 'CARD_DELETE_SUCCESS';
export const CARD_DELETE_FAILURE = 'CARD_DELETE_FAILURE';

const deletingCard = payload => ({
  type: CARD_DELETE_REQUEST,
  payload
});

const deletedCard = payload => ({
  type: CARD_DELETE_SUCCESS,
  payload
});

const deleteCardError = (err, cardId) => ({
  type: CARD_DELETE_FAILURE,
  payload: { err, cardId }
});

export const deleteFromDB = (deleteObj) => dispatch => {
  const { card, user, projectId } = deleteObj;
  console.log(deleteObj);
  switch (card.type) {
    case PROJECT_TYPE:
    dispatch(deletingProject(projectId));
    return axios.post('/auth/verify', user)
    .then(foundUser => {
      if (foundUser.status === 204) {
        return axios.delete(`/api/projects/${user.id}/${projectId}`)
        .then(deletedProject => {
          if (deletedProject.status === 204) {
            dispatch(clearNavigation());
            return dispatch(projectDeleted(projectId));
          } else {
            throw new Error(`Bad Status: ${deletedProject.status}`);
      }});
      } else {
        throw new Error(`Bad Status: ${foundUser.status}`)
      }
    })
    .catch(err => dispatch(projectDeletionError(err, projectId)));

    case ACT_TYPE:
    return makeDeleteRequest(dispatch)('acts', card.id, projectId, user.id);

    case SEQUENCE_TYPE:
    return makeDeleteRequest(dispatch)('sequences', card.id, projectId, user.id);

    case SCENE_TYPE:
    return makeDeleteRequest(dispatch)('scenes', card.id, projectId, user.id);

    case BEAT_TYPE:
    return makeDeleteRequest(dispatch)('beats', card.id, projectId, user.id);
  }
};

function makeDeleteRequest(dispatch) {
  return function(route, cardId, projectId, userId){
  dispatch(deletingCard());
      return axios.delete(`/api/${route}/${cardId}/`)
      .then(deletedCard => {
        if (deletedCard.status === 204) {
          return axios.get(`/api/projects/${userId}/${projectId}`)
          .then(reloadedProject => {
            return dispatch(deletedCard(fromJS(reloadedProject.data)));
          })
          .catch(err => dispatch(projectLoadError(err, projectId)));
        } else {
          throw new Error(`Bad Status: ${deletedCard.status}`);
        }
      })
      .catch(err => dispatch(deleteCardError(err, cardId)));
  };
}
