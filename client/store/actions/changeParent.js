'use strict';
import axios from 'axios';
import {
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  loadSingleProject
} from 'APP/client/store/reducers/project';
import {
  removeNavigationPath
} from 'APP/client/store/reducers/navigator';
import { draftSaved } from 'APP/client/store/reducers/draft';
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

const makeParentUpdateRequest = (route, id, newParentId, projectId, userId) => dispatch => {
  return axios.put(`/api/${route}/parent/${id}/${newParentId}`)
    .then(updated => {
      dispatch(notifSend({
        message: 'parent updated',
        kind: 'info',
        dismissAfter: 2000
      }));
      dispatch(draftSaved());
      return dispatch(loadSingleProject(userId, projectId));
    })
    .catch(err => {
      dispatch(notifSend({
        message: 'parent not updated',
        kind: 'danger',
        dismissAfter: 4000
      }));
      console.error(err);
    });
};

export const changeParent = (saveObj) => dispatch => {
  const {id, newParentId, projectId, userId} = saveObj;

  switch(saveObj.type) {
    case SEQUENCE_TYPE:
    dispatch(removeNavigationPath(SEQUENCE_TYPE));
    dispatch(removeNavigationPath(SCENE_TYPE));
    dispatch(removeNavigationPath(BEAT_TYPE));
    return makeParentUpdateRequest('sequences', id, newParentId, projectId, userId)(dispatch);

    case SCENE_TYPE:
    dispatch(removeNavigationPath(SCENE_TYPE));
    dispatch(removeNavigationPath(BEAT_TYPE));
    return makeParentUpdateRequest('scenes', id, newParentId, projectId, userId)(dispatch);

    case BEAT_TYPE:
    dispatch(removeNavigationPath(BEAT_TYPE));
    return makeParentUpdateRequest('beats', id, newParentId, projectId, userId)(dispatch);
  }
};
