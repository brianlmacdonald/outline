'use strict';
import test from 'ava';
import user, { getUser, removeUser} from '../user';
import { Map } from 'immutable';

const defaultUser = 

test('REDUCER - "user" reducer exists', t => {
  const state = user(undefined, {});
  t.deepEqual(state, Map({}));
});

test('REDUCER - can log in a user', t => {
  const testUser = {
    firstName: 'Bob',
    lastName: 'Squatson',
    email: 'bobbysquats@gmail.com'
  };
  const state = user(undefined, getUser(testUser));
  console.log(state);
  t.deepEqual(state.get('firstName'), 'Bob');
});
