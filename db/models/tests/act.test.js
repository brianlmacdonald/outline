'use strict';
import test, { beforeEach } from 'ava';

const db = require('APP/db');

const testAct = {title: 'test', body: 'test in body'};

beforeEach(async t => {
	await db.didSync;
});

test('DB - Act model exists on the db', async t => {
	const dbNote = Promise.resolve(db.models.act);
	t.is(await typeof dbNote, 'object');
});

test('DB - Acts can be created', async t => {
	const { Act } = db;
	let newActProperties = Promise.resolve(
		Act.create(testAct)
		.then(act => {
			const properties = {
				title: act.get('title')
				,body: act.get('body')
			};
			return properties;
		})
	);
	t.deepEqual(await newActProperties, {
		title: 'test'
		,body: 'test in body'
	});
});

test('DB - Act\'s sequences are loaded with the act when scoped', async t => {
	const { Act, Sequence } = db;
	let id;
	const actWithChange = Promise.resolve(
		Act.create({title: 'test_2', body: 'test in body_2'})
		.then(act => act.get('id'))
		.then(actId => {
			id = actId;
			return Sequence.create({act_id: id, title: 'change 2 to 3'})
			.then(newSequence => {
				return Act.scope('sequences').findOne({where: {id: id}})
				.then(foundAct => {
					return foundAct.get('sequences')[0].title;
				});
			});
		})
	);
	t.is(await actWithChange, 'change 2 to 3');
});
