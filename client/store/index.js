import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducerRegistry from 'APP/client/store/reducers/ReducerRegistry';

const initialState = window.__OUTLINE_STATE__ || {};

const combine = (reducers) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  const appReducer = combineReducers({notifs: notifReducer, ...reducers});
  return (state, action) => {
    if (action.type === 'REMOVE_USER') {
      state = undefined;
    }
    return appReducer(state, action);
  };
};

const reducer = combine(reducerRegistry.getReducers());

const middleWare = process.env.NODE_ENV === 'development' ? composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  )
) :
composeWithDevTools(
  applyMiddleware(
    thunkMiddleware
  )
);


const store = createStore(reducer, initialState, middleWare);


reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

export default store;
