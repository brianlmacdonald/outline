// @flow
'use strict';
import { Map, fromJS, List } from 'immutable';
import { actions as notifActions } from 'redux-notifications';
import type {
  ProjectArray,
  ProjectNode,
  ProjectError,
  ProjectPathArray,
  ProjectPath,
  ProjectId
} from 'APP/Types/Project';
import type {
  UserId
} from 'APP/Types/User';
import type { 
  Dispatch,
  Reducer,
  State
  } from 'APP/Types/Reducer';

import { REMOVE_USER } from './user';
import { createNewDraftCardThunk } from './draft';

import { 
  addNavigationPath,
  removeNavigationPath,
  } from './navigator';

import axios from 'axios';
import history from '../../history';

const { notifSend } = notifActions;

export const PROJECT_TYPE = 'PROJECT_TYPE';
export const ACT_TYPE = 'ACT_TYPE';
export const SEQUENCE_TYPE = 'SEQUENCE_TYPE';
export const SCENE_TYPE = 'SCENE_TYPE';
export const BEAT_TYPE = 'BEAT_TYPE';
export const USER_TYPE = 'USER_TYPE';

export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS';
export const PROJECT_FAILURE = 'PROJECT_FAILURE';

export const ALL_PROJECTS_REQUEST = 'ALL_PROJECTS_REQUEST';
export const ALL_PROJECTS_SUCCESS = 'ALL_PROJECTS_SUCCESS';
export const ALL_PROJECTS_FAILURE = 'ALL_PROJECTS_FAILURE';

export const CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT';
export const NEW_PROJECT_CREATED = 'NEW_PROJECT_CREATED'
export const NEW_PROJECT_ERROR = 'NEW_PROJECT_ERROR';

export const PERSIST_PROJECT_REQUEST = 'PERSIST_PROJECT_REQUEST';
export const PERSIST_PROJECT_SUCCESS = 'PERSIST_PROJECT_SUCCESS';
export const PERSIST_PROJECT_FAILURE = 'PERSIST_PROJECT_FAILURE';

export const PROJECT_DELETE_REQUEST = 'PROJECT_DELETE_REQUEST';
export const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
export const PROJECT_DELETE_FAILURE = 'PROJECT_DELETE_FAILURE';

export const projectLoading = () => {
  return {
    type: PROJECT_REQUEST
  };
};

export const projectLoaded = (project: ProjectArray) => {
  return {
    type: PROJECT_SUCCESS,
    payload: project
  };
};

export const projectLoadError = (error: ProjectError, projectId: ProjectId) => {
  return {
    type: PROJECT_FAILURE,
    payload: {
      error,
      projectId
    }
  };
};

export const allProjectsLoading = () => {
  return {
    type: ALL_PROJECTS_REQUEST
  };
};

export const allProjectsLoaded = (projects: ProjectArray) => {
  return {
    type: ALL_PROJECTS_SUCCESS,
    payload: projects
  };
};

export const allProjectsLoadError = (error: ProjectError) => {
  return {
    type: ALL_PROJECTS_FAILURE,
    payload: {
      error
    }
  };
};

export const projectCreationError = (error: ProjectError) => {
  return {
    type: NEW_PROJECT_ERROR,
    payload: error
  };
};

export const createNewProject = () => {
  return {
    type: CREATE_NEW_PROJECT
  };
};

export const newProjectCreated = (project: ProjectNode) => {
  return {
    type: NEW_PROJECT_CREATED,
    payload: project
  };
};

export const persistingProject = (projectId: ProjectId) => {
  return {
    type: PERSIST_PROJECT_REQUEST,
    payload: projectId
  };
}; 

export const persistedProject = (project: ProjectNode) => {
  return {
    type: PERSIST_PROJECT_SUCCESS,
    payload: project
  };
};

export const persistingProjectFailure = (error: ProjectError, project: ProjectNode, ) => {
  return {
    type: PERSIST_PROJECT_FAILURE,
    payload: { project, error }
  };
};

export const deletingProject = (projectId: ProjectId) => {
  return {
    type: PROJECT_DELETE_REQUEST,
    payload: projectId
  };
};

export const projectDeleted = (projectId: ProjectId) => {
  return {
    type: PROJECT_DELETE_SUCCESS,
    payload: projectId
  };
};

export const projectDeletionError = (error: ProjectError, projectId: ProjectId, ) => {
  return {
    type: PROJECT_DELETE_FAILURE,
    payload: { id: projectId, error }
  };
};

export const loadUserProjects = (userId: UserId) => (dispatch: Dispatch) => {
  dispatch(allProjectsLoading());
  return axios
    .get(`api/projects/${userId}`)
    .then(foundProjects => {
        dispatch(allProjectsLoaded(foundProjects.data));
    })
    .catch(err => dispatch(allProjectsLoadError(err)));
};

export const loadSingleProject = (userId: UserId, projectId: ProjectId) => (dispatch: Dispatch) => {
  dispatch(projectLoading());
  return axios
    .get(`api/projects/${userId}/${projectId}`)
    .then(singleProject => {
      dispatch(projectLoaded(singleProject.data))
      dispatch(addNavigationPath(PROJECT_TYPE, singleProject.data.id))
    })
    .catch(err => dispatch(projectLoadError(err, projectId)));
};

export const creatingNewProject = (userId: UserId) => (dispatch: Dispatch) => {
  let errorId;
  dispatch(createNewProject());
  return axios.post(`api/projects/${userId}`)
  .then(createdProject => {
    errorId = createdProject.data.id
    dispatch(notifSend({
      message: 'project created',
      kind: 'info',
      dismissAfter: 2000
    }))
    return axios.get(`api/projects/${userId}/${createdProject.data.id}`)
    .then(scopedProject => {
      dispatch(newProjectCreated(scopedProject.data));
      dispatch(removeNavigationPath(BEAT_TYPE));
      dispatch(removeNavigationPath(SCENE_TYPE));
      dispatch(removeNavigationPath(SEQUENCE_TYPE));
      dispatch(removeNavigationPath(ACT_TYPE));
      dispatch(addNavigationPath(PROJECT_TYPE, scopedProject.data.id))
      return dispatch(createNewDraftCardThunk(fromJS(scopedProject.data)))
    })
    .catch(err => dispatch(projectLoadError(err, errorId)))
  })
  .catch(err => dispatch(projectCreationError(err)));
};

const defaultState: State = Map({
  'isFetching': false,
  'isSaving': false,
  'userProjects': List([]),
  'trash': List([])
  });

const reducerName: string = 'project';

const projectReducer: Reducer = (state = defaultState, action) => {
  let allProjects;
  let id;
  let loadedList;

  switch (action.type) {
    
    case CREATE_NEW_PROJECT:
      return state.set('isFetching', true);

    case NEW_PROJECT_CREATED:
      loadedList = state.get('userProjects').unshift(fromJS(action.payload));
      return state.set('isFetching', false).withMutations(map => {
        map.set('userProjects', loadedList);
      });

    case ALL_PROJECTS_REQUEST:
      return state.set('isFetching', true);

    case PROJECT_REQUEST:
      return state.set('isFetching', true);

    case ALL_PROJECTS_SUCCESS:
      allProjects = action.payload;
      return state.set('isFetching', false).withMutations(map => {
        allProjects.forEach(proj => {          
          map.set('userProjects', map.get('userProjects').unshift(fromJS(proj)))
        });
      });

    case PROJECT_SUCCESS:
      loadedList = state.get('userProjects')
      .filter(proj => proj.get('id') !== action.payload.id)
      .unshift(fromJS(action.payload));
      return state.set('isFetching', false).withMutations(map => {
        map.set('userProjects', loadedList);
      });

    case ALL_PROJECTS_FAILURE:
      return state.withMutations(map => {
        map.set('isFetching', false)
        .set('error', action.payload.error.message);
      });

    case PROJECT_FAILURE:
      return state.withMutations(map => {
        map.set('isFetching', false)
        .set('error', action.payload.error.message);
      });

    case PERSIST_PROJECT_REQUEST:
      return state.set('isSaving', true);

    case PERSIST_PROJECT_SUCCESS:
      id = action.payload.get('id');
      loadedList = state.get('userProjects')
      .filter(proj => proj.get('id') !== id)
      .unshift(action.payload)
      return state.withMutations(map => {
        map.set('isSaving', false)
        map.set('userProjects', loadedList);
      });

    case PERSIST_PROJECT_FAILURE:
      return state.withMutations(map => {
        map.set('isSaving', false)
        map.set('error', action.payload.error);
      });

    case PROJECT_DELETE_REQUEST:
      return state.set('isSaving', true);

    case PROJECT_DELETE_SUCCESS:
      loadedList = state.get('userProjects')
      .filter(proj => proj.get('id') !== action.payload);
      id = state.get('userProjects')
      .find(proj => proj.get('id') === action.payload);
      return state.withMutations(map => {
        map.set('trash', map.get('trash').unshift(id));
        map.set('userProjects', loadedList);
      });

    case PROJECT_DELETE_FAILURE:
      return state.withMutations(map => {
        map.set('isSaving', false)
        map.set('error', action.payload.error);
      });
    case NEW_PROJECT_ERROR:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export default projectReducer;
