'use strict';
import axios from 'axios';
import { projectLoaded } from 'APP/client/store/reducers/project';
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

export const requestingSearch = () => ({
  type: SEARCH_REQUEST
});

export const searchResults = hitsArray => ({
  type: SEARCH_RESULTS,
  payload: hitsArray
});

export const searchError = err => ({
  type: SEARCH_ERROR,
  payload: err
});

export const updateQuery = query => ({
  type: UPDATE_QUERY,
  payload: query
});

export const toggleSearch = () => ({
  type: TOGGLE_SEARCH
});

export const searchActive = (userId, projectId, term) => dispatch => {
  dispatch(notifSend({
    message: 'searching active project',
    kind: 'info',
    dismissAfter: 2000
  }))
  return axios.get(`/api/search/single-project/${userId}/${projectId}/${term}`)
    .then(results => {
      return results.data.hits;
    })
    .catch(err => dispatch(searchError(err)))
}

export const searchAll = (userId, term) => dispatch => {
  dispatch(notifSend({
    message: 'searching all projects',
    kind: 'info',
    dismissAfter: 2000
  }))
  return axios.get(`/api/search/all-projects/${userId}/${term}`)
    .then(allResults => allResults.data)
    .then(data => {
      let hitsForState = [];
      if (data.length) {
        for (const result of data) {
          const suggestionObj = makeSuggestionObj(result);
          dispatch(projectLoaded(result.project));
          hitsForState = hitsForState.concat(suggestionObj);
        }
        return dispatch(searchResults(hitsForState));
      }
      dispatch(notifSend({
        message: 'no matches found',
        kind: 'info',
        dismissAfter: 4000
      }));
    })
    .catch(err => dispatch(searchError(err)))
}

function makeSuggestionObj(res) {
  return {title: res.project.title, id: res.project.id, hits: res.hits};
}
