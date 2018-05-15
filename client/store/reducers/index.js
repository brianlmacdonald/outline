import { combineReducers } from 'redux';
import user from './user';
import project from './project';
import navigator from './navigator';
import draft from './draft';
import { reducer as notifReducer } from 'redux-notifications';

const rootReducer = combineReducers({
  notifs: notifReducer,
  user,
  project,
  navigator,
  draft,
  });

export default rootReducer;
export * from './user';
export * from './project';
export * from './navigator';
export * from './draft';
