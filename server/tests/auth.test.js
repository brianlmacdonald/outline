'use strict';

import test from 'ava';
const request = require('supertest');
const auth = require('APP/server/auth');
const { makeApp, setUp } = require('./setupFunctions');

test('SERVER - auth exists', t => {
  t.is(typeof auth, 'function');
});

//unsure if I like this
// test('SERVER - auth can sign up a new user', async t => {
//   const res = await request(makeApp('/auth/signup'))
// 		.post('/auth/signup')
// 		.send({email: 'ava@rocks.com', password: '123123'});

// 	t.is(res.status, 200);
// 	t.is(res.body.email, 'ava@rocks.com');

// });



