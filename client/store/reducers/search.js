'use strict';
import { Map, List } from 'immutable';
import { 
  SEARCH_REQUEST,
  SEARCH_RESULTS,
  SEARCH_ERROR,
  UPDATE_QUERY,
  CLEAR_SEARCH
  } from 'APP/client/store/actions/search';

const defaultState = Map({
  fetching: false,
  query: '',
  results: [],
})

const searchReducer = (state = defaultState, action) => {

  switch(action.type){
    case SEARCH_REQUEST:
      return state.set('fetching', true);
    
    case SEARCH_RESULTS:
      return state.set('fetching', false).withMutations(map => {
        map.set('results', action.payload);
      });

    case SEARCH_ERROR:
      return state.set('error', action.payload).set('fetching', false);

    case UPDATE_QUERY:
      return state.set('query', action.payload);
    
    case CLEAR_SEARCH:
      return state.set('results', []);

    default:
      return state;
  }

}

export default searchReducer;
