import axios from 'axios';
import {Map} from 'immutable';

import { loadUserProjects } from './index';
import history from '../../history';

const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
const GET_USER_ERROR = 'GET_USER_ERROR';

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
        dispatch(loadUserProjects(res.data.id));
        history.replace('/user');
      }, authError => {
        dispatch(getUser({ error: authError }));
      })
      .catch(error => errorGettingUser(error));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser());
        history.push('/');
      })
      .catch(error => errorGettingUser(error));

export default function (state = Map({}), action) {
  switch (action.type) {
    
    case GET_USER:
      return state.mergeDeep(action.payload);
    
    case GET_USER_ERROR:
      return state.set('error', action.payload);

    case REMOVE_USER:
      return state.clear();

    default:
      return state;
  }
}
