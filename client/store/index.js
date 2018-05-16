import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducerRegistry from './reducers/ReducerRegistry';

const initialState = window.__OUTLINE_STATE__ || {};

const combine = (reducers) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers({notifs: notifReducer, ...reducers});
};

const reducer = combine(reducerRegistry.getReducers());

const middleWare = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({diff: true})
  )
);

const store = createStore(reducer, initialState, middleWare);

reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

export default store;
