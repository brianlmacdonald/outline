import {combineReducers} from 'redux';
import user from './user';
import project from './project';
import navigator from './navigator';

const rootReducer = combineReducers({ user, project, navigator });

export default rootReducer;
export * from './user';
export * from './project';
export * from './navigator';
