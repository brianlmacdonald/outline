"use strict";
import { List } from "immutable";

export const PROJECT_REQUEST = "PROJECT_REQUEST";
export const PROJECT_SUCCESS = "PROJECT_SUCCESS";
export const PROJECT_FAILURE = "PROJECT_FAILURE";

export const PROJECTS_REQUEST = "PROJECTS_REQUEST";
export const PROJECTS_SUCCESS = "PROJECTS_SUCCESS";
export const PROJECTS_FAILURE = "PROJECTS_FAILURE";

export function projectLoading(project) {
  return {
    type: PROJECT_REQUEST,
    payload: project
  };
}

export function projectLoaded(project) {
  return {
    type: PROJECT_SUCCESS,
    payload: project
  };
}

export function entryLoadError(error, project) {
  return {
    type: PROJECT_FAILURE,
    payload: {
      error,
      project
    },
  };
}
