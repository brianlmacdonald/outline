import axios from 'axios';
import { Map, fromJS } from 'immutable';
import reducerRegistry from './ReducerRegistry';
import history from '../../history';

export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const GET_USER_ERROR = 'GET_USER_ERROR';

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
      return state.mergeDeep(action.payload);
    
    case GET_USER_ERROR:
      return state.set('error', action.payload);

    case REMOVE_USER:
      return state.withMutations(map => {
        map.clear();
        map.set(defaultUser);
      });

    default:
      return state;
  }
}

reducerRegistry.register(reducerName, userReducer);

export default userReducer;
