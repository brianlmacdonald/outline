'use strict';
import test, { beforeEach } from 'ava';

const db = require('APP/db');

const testSequence = {title: 'test should pass'};

beforeEach(async t => {
	await db.didSync;
});

test('DB - Change model exists on the db', async t => {
	const dbSequence = Promise.resolve(db.models.sequence);
	t.is(await typeof dbSequence, 'object');
});

test('DB - Changes can be created', async t => {
	const { Sequence } = db;
	let newSequenceProperties = Promise.resolve(
		Sequence.create(testSequence)
		.then(sequence => {
			const properties = {
				title: sequence.get('title')
			};
			return properties;
		})
	);
	t.deepEqual(await newSequenceProperties, {
		title: 'test should pass'
	});
});
