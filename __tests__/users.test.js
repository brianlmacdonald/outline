'use strict'

const db = require('APP/db');
const { User } = db;

import test from 'ava';
const {beforeAll, afterEach, describe} = test;

describe('User', () => {
  beforeAll('sync db', () => db.didSync)
  afterEach('clear db', () => db.truncate({cascade: true}))

  describe('Users instance comes out fully defined', () => {
    User.create({firstName: 'Bob', lastName: 'Squat', email: 'hotSquats@bobsquats.com', password: 1})
    it('')
  })
})