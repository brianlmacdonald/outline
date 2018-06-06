import axios from 'axios';
import { Map, fromJS } from 'immutable';
import reducerRegistry from 'APP/client/store/reducers/ReducerRegistry';
import history from 'APP/client/history';

export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const GET_USER_ERROR = 'GET_USER_ERROR';
const ALL_PROJECTS_SUCCESS = 'ALL_PROJECTS_SUCCESS';

export const getUser = user => {
  return {
    type: GET_USER,
    payload: user
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const errorGettingUser = (error) => {
  return {
    type: GET_USER_ERROR,
    payload: error
  };
};

const defaultUser = Map({});

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser));
        }
      )
      .catch(error => errorGettingUser(error));

export const auth = (email, password, method, firstName, lastName) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, firstName, lastName })
      .then(res => {
        dispatch(getUser(res.data));
        history.replace('/projects');
      }, authError => {
        dispatch(getUser({ error: authError }));
      })
      .catch(error => errorGettingUser(error));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(() => {
        history.push('/');
        dispatch(removeUser());
      })
      .catch(error => errorGettingUser(error));

const reducerName = 'user';

function userReducer(state = defaultUser, action) {
  switch (action.type) {
    
    case GET_USER:
      return state.mergeDeep(action.payload).set('initialLoad', false);
    
    case GET_USER_ERROR:
      return state.set('error', action.payload);

    case ALL_PROJECTS_SUCCESS:
      return state.set('initialLoad', true);

    default:
      return state;
  }
}

reducerRegistry.register(reducerName, userReducer);

export default userReducer;
