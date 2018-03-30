'use strict';
import test, { beforeEach } from 'ava';

const { setUp } = require('./setupFunctions');
setUp();
const db = require('APP/db');

const testChange = {title: 'test should pass'}

beforeEach(async t => {
	await db.didSync;
});

test(`DB - Change model exists on the db`, async t => {
	const dbChange = Promise.resolve(db.models.change);
	t.is(await typeof dbChange, 'object');
});

test(`DB - Changes can be created`, async t => {
	const { Change } = db;
	let newChangeProperties = Promise.resolve(
		Change.create(testChange)
		.then(change => {
			const properties = {
				title: change.get('title')
			}
			return properties;
		})
	)
	t.deepEqual(await newChangeProperties, {
		title: 'test should pass'
	})
});
