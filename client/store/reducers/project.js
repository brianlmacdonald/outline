'use strict';
import { Map, fromJS } from 'immutable';
import axios from 'axios';

import { REMOVE_USER } from './user';

export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS';
export const PROJECT_FAILURE = 'PROJECT_FAILURE';

export const ALL_PROJECTS_REQUEST = 'ALL_PROJECTS_REQUEST';
export const ALL_PROJECTS_SUCCESS = 'ALL_PROJECTS_SUCCESS';
export const ALL_PROJECTS_FAILURE = 'ALL_PROJECTS_FAILURE';

export const CREATE_DRAFT_PROJECT = 'CREATE_DRAFT_PROJECT';
export const DISCARD_DRAFT_PROJECT = 'DISCARD_DRAFT_PROJECT';

export const SAVE_DRAFT_REQUEST = 'SAVE_DRAFT_REQUEST';
export const SAVE_DRAFT_SUCCESS = 'SAVE_DRAFT_SUCCESS';
export const SAVE_DRAFT_FAILURE = 'SAVE_DRAFT_FAILURE';

export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_FAILURE = 'UPDATE_PROJECT_FAILURE';

export const PROJECT_DELETE_REQUEST = 'PROJECT_DELETE_REQUEST';
export const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
export const PROJECT_DELETE_FAILURE = 'PROJECT_DELETE_FAILURE';

export const projectLoading = (project) => {
  return {
    type: PROJECT_REQUEST,
    payload: project
  };
}

export const projectLoaded = (project) => {
  return {
    type: PROJECT_SUCCESS,
    payload: project
  };
}

export const projectLoadError = (error, project) => {
  return {
    type: PROJECT_FAILURE,
    payload: {
      error,
      project
    },
  };
}

export const allProjectsLoading = () => {
  return {
    type: ALL_PROJECTS_REQUEST,
  };
}

export const allProjectsLoaded = (projects) => {
  return {
    type: ALL_PROJECTS_SUCCESS,
    payload: projects
  };
}

export const allProjectsLoadError = (error) => {
  return {
    type: ALL_PROJECTS_FAILURE,
    payload: {
      error,
    },
  };
}

export const createDraft = (project) => {
  return {
    type: CREATE_DRAFT_PROJECT,
    payload: project,
  };
}

export const discardDraft = (project) => {
  return {
    type: DISCARD_DRAFT_PROJECT,
    payload: project,
  };
}

export const savingDraft = (project) => {
  return {
    type: SAVE_DRAFT_REQUEST,
    payload: project
  };
}

export const draftSaved = (project) => {
  return {
    type: SAVE_DRAFT_SUCCESS,
    payload: project
  };
}

export const errorSavingDraft = (project, error) => {
  return {
    type: SAVE_DRAFT_FAILURE,
    payload: {
      project,
      error
    }
  };
}

export const updatingProject = (project) => {
  return {
    type: UPDATE_PROJECT_REQUEST,
    payload: project
  };
}

export const projectUpdated = (project) => {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: project
  };
}

export const updateProjectFailure = (project, error) => {
  return {
    type: UPDATE_PROJECT_FAILURE,
    payload: { project, error }
  };
}

export const deletingProject = (project) => {
  return {
    type: PROJECT_DELETE_REQUEST,
    payload: project
  };
}

export const projectDeleted = (project) => {
  return {
    type: PROJECT_DELETE_SUCCESS,
    payload: project
  };
}

export const projectDeletionError = (project, error) => {
  return {
    type: PROJECT_DELETE_FAILURE,
    payload: {project, error}
  }
}

//loadUserProjects tries to find and load the user's existing projects,
//if none are found it creates a new project and loads that.
//**this thunk is run in the auth thunk in user.
export const loadUserProjects = (userId) =>
  dispatch => {
    dispatch(allProjectsLoading());

    return axios.get(`api/projects/${userId}`)
    .then(foundProjects => {
      if (foundProjects.data.length === 0) {
        axios.post(`api/projects/${userId}`)
        .then(createdProject => {
          dispatch(allProjectsLoaded([createdProject.data]));
        })
        .catch(err => dispatch(allProjectsLoadError(err)));
      } else {
        dispatch(allProjectsLoaded(foundProjects.data));
      }
    })
    .catch(err => dispatch(allProjectsLoadError(err)));
};

export const loadSingleProject = (userId, project) => 
  dispatch => {
    dispatch(projectLoading(project));

    return axios.get(`api/projects/${userId}/${project.id}`)//think on this...
      .then(singleProject => projectLoaded(singleProject))
      .catch(err => dispatch(projectLoadError(project, err)));
  };

export default function project(state = Map({}), action) {
  let allProjects;
  let title;

  switch(action.type) {

    case ALL_PROJECTS_REQUEST:
      return state.setIn(['userProjects', 'isFetching'], true);
      
    case PROJECT_REQUEST:
      return state.setIn([
        'userProjects',
        action.payload.title,
        'isFetching'], true);

    case ALL_PROJECTS_SUCCESS:
      allProjects = action.payload;
      return state.setIn([
        'userProjects',
        'isFetching'],
        false).withMutations(map => {
        allProjects.forEach(project => (
          map.setIn([
            'userProjects',
            project.title],
            fromJS(project).set('isFetching', false))
        ));
      });
    case PROJECT_SUCCESS:
      return state.withMutations(map => {
        map.setIn([
          'userProjects',
          action.payload.title],
          fromJS(action.payload).set('isFetching', false));
      });
    
    case ALL_PROJECTS_FAILURE:
      return state.withMutations(map => {
        map.setIn(['userProjects', 'isFetching'], false);
        map.setIn(['userProjects', 'error'], action.payload.error.message);
      });
    
    case PROJECT_FAILURE:
      return state.withMutations(map => {
        map.setIn([
          'userProjects',
          action.payload.project.title,
          'isFetching'], false);
        map.setIn([
          'userProjects',
          action.payload.project.title,
          'error'
        ], action.payload.error.message);
      });
    
    case CREATE_DRAFT_PROJECT:
      return state.withMutations(map => {
        map.setIn([
          'draftProjects',
          action.payload.title],
          fromJS(action.payload));
      });
    
    case DISCARD_DRAFT_PROJECT:
      return state.deleteIn(['draftProjects', action.payload.title]);
    
    case SAVE_DRAFT_REQUEST:
      return state.setIn([
        'draftProjects',
        action.payload.title,
        'isSaving'], true);
    
    case SAVE_DRAFT_SUCCESS:
      return state.withMutations(map => {
        map.deleteIn([
          'draftProjects',
          action.payload.title]);
        map.setIn([
            'userProjects',
            action.payload.title],
            fromJS(action.payload).set('isSaving', false));
      });
    
    case SAVE_DRAFT_FAILURE:
      title = action.payload.project.title;
      return state.withMutations(map => {
        map.setIn(['draftProjects', title, 'isSaving'], false);
        map.setIn(['draftProjects', title, 'error'], action.payload.error);
      });

    case UPDATE_PROJECT_REQUEST:
      return state.setIn([
        'userProjects',
        action.payload.title,
        'isSaving'], true);
    
    case UPDATE_PROJECT_SUCCESS:
      return state.withMutations(map => {
        map.setIn([
          'userProjects',
          action.payload.title],
          fromJS(action.payload).set('isSaving', false));
      });
    
    case PROJECT_DELETE_REQUEST:
      return state.setIn([
        'userProjects',
        action.payload.title,
        'isSaving'], true);
    
    case PROJECT_DELETE_SUCCESS:
      return state.deleteIn(['userProjects', action.payload.title]);

    case PROJECT_DELETE_FAILURE:
      return state.withMutations(map => {
        map.setIn([
          'userProjects',
          action.payload.title,
          'isSaving'], false);
        map.setIn([
          'userProjects',
          action.payload.title,
          'error'],
          action.payload.error);
      });
    
    case REMOVE_USER:
      return state.clear();

    default:
      return state;
  }

}

