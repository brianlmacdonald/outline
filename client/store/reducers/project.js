"use strict";
import { Map, fromJS } from "immutable";

export const PROJECT_REQUEST = "PROJECT_REQUEST";
export const PROJECT_SUCCESS = "PROJECT_SUCCESS";
export const PROJECT_FAILURE = "PROJECT_FAILURE";

export const ALL_PROJECTS_REQUEST = "PROJECTS_REQUEST";
export const ALL_PROJECTS_SUCCESS = "PROJECTS_SUCCESS";
export const ALL_PROJECTS_FAILURE = "PROJECTS_FAILURE";

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

export function projectLoadError(error, project) {
  return {
    type: PROJECT_FAILURE,
    payload: {
      error,
      project
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

export function allProjectsLoadError(error, projects) {
  return {
    type: ALL_PROJECTS_FAILURE,
    payload: {
      error,
      projects
    },
  };
}

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

    default:
      return state;
  }

}

