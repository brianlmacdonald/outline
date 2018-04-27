import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const middleWare = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({diff: true})
  )
);

const store = createStore(rootReducer, middleWare);

export default store;
export * from './reducers';
export * from './actions';
