import axios from 'axios';
import {Map} from 'immutable';

import history from '../../history';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

export const getUser = user => ({type: GET_USER, user});
export const removeUser = () => ({type: REMOVE_USER});

const defaultUser = Map({});

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser));
        }
      )
      .catch(err => console.log(err));

export const auth = (email, password, method, firstName, lastName) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, firstName, lastName })
      .then(res => {
        dispatch(getUser(res.data));
      }, authError => {
        dispatch(getUser({ error: authError }));
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser());
      })
      .catch(err => console.log(err));

export default function (state = Map({}), action) {
  switch (action.type) {
    case GET_USER:
      return state.mergeDeep(action.user);
    case REMOVE_USER:
      return state.clear();
    default:
      return state;
  }
}
