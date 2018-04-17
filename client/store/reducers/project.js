'use strict';
import { Map, fromJS } from 'immutable';
import axios from 'axios';

export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS';
export const PROJECT_FAILURE = 'PROJECT_FAILURE';

export const ALL_PROJECTS_REQUEST = 'ALL_PROJECTS_REQUEST';
export const ALL_PROJECTS_SUCCESS = 'ALL_PROJECTS_SUCCESS';
export const ALL_PROJECTS_FAILURE = 'ALL_PROJECTS_FAILURE';

export function projectLoading(title) {
  return {
    type: PROJECT_REQUEST,
    payload: title
  };
}

export function projectLoaded(project) {
  return {
    type: PROJECT_SUCCESS,
    payload: project
  };
}

export function projectLoadError(error, title) {
  return {
    type: PROJECT_FAILURE,
    payload: {
      error,
      title
    },
  };
}

export function allProjectsLoading() {
  return {
    type: ALL_PROJECTS_REQUEST,
  };
}

export function allProjectsLoaded(projects) {
  return {
    type: ALL_PROJECTS_SUCCESS,
    payload: projects
  };
}

export function allProjectsLoadError(error) {
  return {
    type: ALL_PROJECTS_FAILURE,
    payload: {
      error,
    },
  };
}

export const loadUserProjects = (userId) =>
  dispatch => {
    dispatch(allProjectsLoading());
    return axios.get(`api/projects/${userId}`)
    .then(foundProjects => {
      if (!foundProjects) {
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

export default function project(state = Map({}), action) {
  let allProjects;
  let project;

  switch(action.type) {

    case ALL_PROJECTS_REQUEST:
      return state.setIn(['userProjects', 'isFetching'], true);
      
    case PROJECT_REQUEST:
      return state.setIn(['userProjects', action.payload, 'isFetching'], true);

    case ALL_PROJECTS_SUCCESS:
      allProjects = action.payload;
      return state.setIn(['userProjects', 'isFetching'], false).withMutations(map => {
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
        map.setIn(['userProjects', action.payload.title, 'isFetching'], false);
        map.setIn(['userProjects', action.payload.title, 'error'], action.payload.error.message);
      });

    default:
      return state;
  }

}

