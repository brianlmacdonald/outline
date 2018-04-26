import { combineReducers } from 'redux';
import user from './user';
import project from './project';
import navigator from './navigator';
import draft from './draft';

console.log(user, 'user');
console.log(project, 'project');
console.log(navigator, 'navigator');

const rootReducer = combineReducers({ user, project, navigator, draft });

export default rootReducer;
export * from './user';
export * from './project';
export * from './navigator';
export * from './draft';
