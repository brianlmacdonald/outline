'use strict';
import axios from 'axios';
import {
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  loadSingleProject
} from 'APP/client/store/reducers/project';

const makeParentUpdateRequest = (route, id, newParentId, projectId, userId) => dispatch => {
  return axios.put(`/api/${route}/parent/${id}/${newParentId}`)
    .then(updated => dispatch(loadSingleProject(userId, projectId)))
    .catch(err => console.error(err));
};

export const changeParent = (saveObj) => {
  const {id, newParentId, projectId, userId} = saveObj;

  switch(saveObj.type) {
    case SEQUENCE_TYPE:
    return makeParentUpdateRequest('sequences', id, newParentId, projectId, userId);

    case SCENE_TYPE:
    return makeParentUpdateRequest('scenes', id, newParentId, projectId, userId);

    case BEAT_TYPE:
    return makeParentUpdateRequest('beats', id, newParentId, projectId, userId);
  }
};
