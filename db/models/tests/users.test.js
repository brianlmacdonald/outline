'use strict';
import test, { beforeEach } from 'ava';

const db = require('APP/db');

beforeEach(async t => {
	await db.didSync;
});

const bob = {
	firstName: 'Bob'
	,lastName: 'Squatson'
	,email: 'sqautsypoo@excite.com'
	,password: 'a'
};

const ed = {
	firstName: 'Ed'
	,lastName: 'Squatson'
	,email: 'EdSquatsypoo@excite.com'
	,password: 'b'
};

const ted = {
	firstName: 'Ted'
	,lastName: 'Squatson'
	,email: 'TedS@gmail.com'
	,password: 'c'
};


test('DB - User model exists on the db', async t => {
	const dbUsers = Promise.resolve(db.models.user);
	t.is(await typeof dbUsers, 'object');
});

test('DB - Users can be created', async t => {
	const { User } = db;
	let newUserProperties = Promise.resolve(
		User.create(ed)
		.then(user => {
			const properties = {
				firstName: user.get('firstName')
				,lastName: user.get('lastName')
				,email: user.get('email')
			};
			return properties;
		})
	);
	t.deepEqual(await newUserProperties, {
		email: 'EdSquatsypoo@excite.com'
		,firstName: 'Ed'
		,lastName: 'Squatson'
	});
});

test('DB - User\'s projects are loaded with the user when scoped', async t => {
	const { Project, User } = db;
	let id;
	const bobsProject = Promise.resolve(
		User.create(bob)
		.then(user => user.get('id'))
		.then(userId => {
			id = userId;
			return Project.create({user_id: id, title: 'Visionary Project'})
			.then(newProject => {
				return User.scope('userProjects').findOne({where: {id: id}})
				.then(foundBob => {
					return foundBob.get('projects')[0].title;
				});
			});
		})
	);
	t.is(await bobsProject, 'Visionary Project');
});

test('DB - User instance has a check password method', async t => {
	const { User } = db;
	const hasPasswordFunction = Promise.resolve(
		User.create(ted)
		.then(createdTed => createdTed.checkPassword('c'))
	);
	t.is(await hasPasswordFunction, true);
});

test('DB - Wrong passwords are rejected', async t => {
	const { User } = db;
	const wrongPassword = Promise.resolve(
		User.create({
			firstName: 'a',
			lastName: 'b',
			email: 'a@b.com',
			password: 'd'
			})
		.then(createdA => createdA.checkPassword('c'))
	);
	t.is(await wrongPassword, false);
});

