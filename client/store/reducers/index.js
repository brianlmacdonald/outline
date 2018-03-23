import {combineReducers} from 'redux';
import defaultReducer from './defaultReducer'; //delete 
import user from './user';

const rootReducer = combineReducers({defaultReducer, user});

export default rootReducer;
export * from './user';
