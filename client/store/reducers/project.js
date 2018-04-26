'use strict';
import { Map, fromJS, List } from 'immutable';
import uuid from 'uuid';

import { projectPayload } from './tests/superState'; //development testing delete for production or once seeded db.

import { REMOVE_USER } from './user';

import axios from 'axios';
import history from '../../history';

export const PROJECT_TYPE = 'PROJECT_TYPE';
export const ACT_TYPE = 'ACT_TYPE';
export const SEQUENCE_TYPE = 'SEQUENCE_TYPE';
export const SCENE_TYPE = 'SCENE_TYPE';
export const BEAT_TYPE = 'BEAT_TYPE';

export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS';
export const PROJECT_FAILURE = 'PROJECT_FAILURE';

export const ALL_PROJECTS_REQUEST = 'ALL_PROJECTS_REQUEST';
export const ALL_PROJECTS_SUCCESS = 'ALL_PROJECTS_SUCCESS';
export const ALL_PROJECTS_FAILURE = 'ALL_PROJECTS_FAILURE';

export const CREATE_DRAFT_PROJECT = 'CREATE_DRAFT_PROJECT';
export const CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT';
export const NEW_PROJECT_CREATED = 'NEW_PROJECT_CREATED'
export const NEW_PROJECT_ERROR = 'NEW_PROJECT_ERROR';
export const CREATE_NEW_ACT = 'CREATE_NEW_ACT';
export const CREATE_NEW_SEQUENCE = 'CREATE_NEW_SEQUENCE';
export const CREATE_NEW_SCENE = 'CREATE_NEW_SCENE';
export const CREATE_NEW_BEAT = 'CREATE_NEW_BEAT';
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

export const projectLoading = () => {
  return {
    type: PROJECT_REQUEST
  };
};

export const projectLoaded = project => {
  return {
    type: PROJECT_SUCCESS,
    payload: project
  };
};

export const projectLoadError = (error, project) => {
  return {
    type: PROJECT_FAILURE,
    payload: {
      error,
      project
    }
  };
};

export const allProjectsLoading = () => {
  return {
    type: ALL_PROJECTS_REQUEST
  };
};

export const allProjectsLoaded = projects => {
  return {
    type: ALL_PROJECTS_SUCCESS,
    payload: projects
  };
};

export const allProjectsLoadError = error => {
  return {
    type: ALL_PROJECTS_FAILURE,
    payload: {
      error
    }
  };
};

export const projectCreationError = error => {
  return {
    type: NEW_PROJECT_ERROR,
    payload: error
  };
};

export const createDraft = project => {
  return {
    type: CREATE_DRAFT_PROJECT,
    payload: project
  };
};

export const createNewProject = () => {
  return {
    type: CREATE_NEW_PROJECT
  };
};

export const newProjectCreated = project => {
  return {
    type: NEW_PROJECT_CREATED,
    payload: project
  };
};

export const createNewAct = parent => {
  return {
    type: CREATE_NEW_ACT,
    payload: parent
  };
};

export const createNewSequence = parent => {
  return {
    type: CREATE_NEW_SEQUENCE,
    payload: parent
  };
};

export const createNewScene = parent => {
  return {
    type: CREATE_NEW_SCENE,
    payload: parent
  };
};

export const createNewBeat = parent => {
  return {
    type: CREATE_NEW_BEAT,
    payload: parent
  };
};

export const discardDraft = project => {
  return {
    type: DISCARD_DRAFT_PROJECT,
    payload: project
  };
};

export const savingDraft = project => {
  return {
    type: SAVE_DRAFT_REQUEST,
    payload: project
  };
};

export const draftSaved = project => {
  return {
    type: SAVE_DRAFT_SUCCESS,
    payload: project
  };
};

export const errorSavingDraft = (project, error) => {
  return {
    type: SAVE_DRAFT_FAILURE,
    payload: {
      project,
      error
    }
  };
};

export const updatingProject = project => {
  return {
    type: UPDATE_PROJECT_REQUEST,
    payload: project
  };
};

export const projectUpdated = project => {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: project
  };
};

export const updateProjectFailure = (project, error) => {
  return {
    type: UPDATE_PROJECT_FAILURE,
    payload: { project, error }
  };
};

export const deletingProject = project => {
  return {
    type: PROJECT_DELETE_REQUEST,
    payload: project
  };
};

export const projectDeleted = project => {
  return {
    type: PROJECT_DELETE_SUCCESS,
    payload: project
  };
};

export const projectDeletionError = (project, error) => {
  return {
    type: PROJECT_DELETE_FAILURE,
    payload: { project, error }
  };
};

export const loadUserProjects = userId => dispatch => {
  dispatch(allProjectsLoading());

  return axios
    .get(`api/projects/${userId}`)
    .then(foundProjects => {
      if (foundProjects.data.length === 0) {
        return;
      } else {
        dispatch(allProjectsLoaded(foundProjects.data));
      }
    })
    .catch(err => dispatch(allProjectsLoadError(err)));
};

export const loadSingleProject = (userId, project) => dispatch => {
  dispatch(projectLoading());

  return axios
    .get(`api/projects/${userId}/${project.id}`)
    .then(singleProject => projectLoaded(singleProject))
    .catch(err => dispatch(projectLoadError(project, err)));
};

export const creatingNewProject = (userId) => dispatch => {
  dispatch(createNewProject());
  return axios.post(`api/projects/${userId}`)
  .then(createdProject => {
    dispatch(newProjectCreated(createdProject));
    return createdProject.id;
  })
  .catch(err => dispatch(projectCreationError(err)));
};

// const uP = fromJS(projectPayload);
const uP = Map({});

const defaultState = Map({
  isFetching: false,
  userProjects: uP
});

export default function project(state = defaultState, action) {
  let allProjects;
  let id;

  switch (action.type) {
    case CREATE_NEW_BEAT:
      id = uuid();
      return state.setIn(action.payload, Map({})).withMutations(map => {
        map.setIn(action.payload.concat('type'), BEAT_TYPE)
        .setIn(action.payload.concat('id'), id)
        .setIn(action.payload.concat('body'), '')
        .setIn(action.payload.concat('title'), 'untitled beat')
        .setIn(
          action.payload.concat('index'),
          action.payload[action.payload.length - 1]
        );
      });

    case CREATE_NEW_SCENE:
      id = uuid();
      return state.setIn(action.payload, Map({})).withMutations(map => {
        map.setIn(action.payload.concat('beats'), List())
        .setIn(action.payload.concat('type'), SCENE_TYPE)
        .setIn(action.payload.concat('id'), id)
        .setIn(action.payload.concat('body'), '')
        .setIn(action.payload.concat('title'), 'untitled scene')
        .setIn(
          action.payload.concat('index'),
          action.payload[action.payload.length - 1]
        );
      });

    case CREATE_NEW_SEQUENCE:
      id = uuid();
      return state.setIn(action.payload, Map({})).withMutations(map => {
        map.setIn(action.payload.concat('scenes'), List())
        .setIn(action.payload.concat('type'), SEQUENCE_TYPE)
        .setIn(action.payload.concat('id'), id)
        .setIn(action.payload.concat('body'), '')
        .setIn(action.payload.concat('title'), 'untitled sequence')
        .setIn(
          action.payload.concat('index'),
          action.payload[action.payload.length - 1]
        );
      });

    case CREATE_NEW_ACT:
      id = uuid();
      return state.setIn(action.payload, Map({})).withMutations(map => {
        map.setIn(action.payload.concat('sequences'), List())
        .setIn(action.payload.concat('type'), ACT_TYPE)
        .setIn(action.payload.concat('id'), id)
        .setIn(action.payload.concat('body'), '')
        .setIn(action.payload.concat('title'), 'untitled act')
        .setIn(
          action.payload.concat('index'),
          action.payload[action.payload.length - 1]
        );
      });
    case CREATE_NEW_PROJECT:
      return state.set('isFetching', true);

    case NEW_PROJECT_CREATED:
      id = action.payload.id;
      return state.set('isFetching', false)
      .setIn(['userProjects', id], Map({})).withMutations(map => {
        map.setIn(['userProjects', id, 'acts'], List([]))
        .setIn(['userProjects', id, 'type'], PROJECT_TYPE)
        .setIn(['userProjects', id, 'id'], id)
        .setIn(['userProjects', id, 'body'], '')
        .setIn(
          ['userProjects', id, 'title'],
          action.payload.title
        );
      });

    case ALL_PROJECTS_REQUEST:
      return state.set('isFetching', true);

    case PROJECT_REQUEST:
      return state.set('isFetching', true);

    case ALL_PROJECTS_SUCCESS:
      allProjects = action.payload;
      return state.set('isFetching', false).withMutations(map => {
        allProjects.forEach(project =>
          map.setIn(['userProjects', project.id], fromJS(project))
        );
      });

    case PROJECT_SUCCESS:
      return state.set('isFetching', false).withMutations(map => {
        map.setIn(['userProjects', action.payload.id], fromJS(action.payload));
      });

    case ALL_PROJECTS_FAILURE:
      return state.withMutations(map => {
        map.set('isFetching', false)
        .setIn(['userProjects', 'error'], action.payload.error.message);
      });

    case PROJECT_FAILURE:
      return state.withMutations(map => {
        map.set('isFetching', false)
        .setIn(
          ['userProjects', action.payload.project.title, 'error'],
          action.payload.error.message
        );
      });

    case CREATE_DRAFT_PROJECT:
      return state.withMutations(map => {
        map.setIn(['userProjects', action.payload.id], fromJS(action.payload));
      });

    case DISCARD_DRAFT_PROJECT:
      return state.deleteIn(['userProjects', action.payload.id]);

    case SAVE_DRAFT_REQUEST:
      return state.setIn(
        ['userProjects', action.payload.id, 'isSaving'],
        true
      );

    case SAVE_DRAFT_SUCCESS:
      return state.withMutations(map => {
        map.setIn(['userProjects', action.payload.id], fromJS(action.payload));
      });

    case SAVE_DRAFT_FAILURE:
      id = action.payload.project.id;
      return state.withMutations(map => {
        map.setIn(['userProjects', id, 'isSaving'], false)
        .setIn(['userProjects', id, 'error'], action.payload.error);
      });

    case UPDATE_PROJECT_REQUEST:
      return state.setIn(['userProjects', action.payload.id, 'isSaving'], true);

    case UPDATE_PROJECT_SUCCESS:
      return state.withMutations(map => {
        map.setIn(
          ['userProjects', action.payload.id],
          fromJS(action.payload).set('isSaving', false)
        );
      });

    case PROJECT_DELETE_REQUEST:
      return state.setIn(['userProjects', action.payload.id, 'isSaving'], true);

    case PROJECT_DELETE_SUCCESS:
      return state.deleteIn(['userProjects', action.payload.id]);

    case PROJECT_DELETE_FAILURE:
      return state.withMutations(map => {
        map.setIn(['userProjects', action.payload.id, 'isSaving'], false)
        .setIn(
          ['userProjects', action.payload.id, 'error'],
          action.payload.error
        );
      });
    case NEW_PROJECT_ERROR:
      return state.setIn(['userProjects', 'error'], action.payload);

    case REMOVE_USER:
      return state.clear();

    default:
      return state;
  }
}
