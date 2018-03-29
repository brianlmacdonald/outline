import test, { beforeEach } from 'ava';

const { setUp, tearDown } = require('./setupFunctions');
setUp();
const db = require('APP/db');

beforeEach(async t => {
	await db.didSync;
})

const bob = {
	firstName: "Bob",
	lastName: 'Squatson',
	email: 'sqautsypoo@excite.com',
	password: 'a'
}

const ed = {
	firstName: "Ed",
	lastName: 'Squatson',
	email: 'EdSqautsypoo@excite.com',
	password: 'b'
}


test(`User model exists on the db`, async t => {
	const dbUsers = Promise.resolve(db.models.user);
	t.is(await typeof dbUsers, 'object');
});

test(`User's can be created`, async t => {
	const { User } = db;
	let newUserFirstName = Promise.resolve(
		User.create(ed)
		.then(user => {
			return user.get('firstName')
		})
	)
	t.is(await newUserFirstName, 'Ed')
})

test(`User's projects are loaded with the user when scoped`, async t => {
	const { Project, User } = db;
	let id;
	const bobsProject = Promise.resolve(
		User.create(bob)
		.then(user => user.get('id'))
		.then(userId => {
			id = userId;
			return Project.create({user_id: id, name: `Visionary Project`})
			.then(newProject => {
				return User.scope('userProjects').findOne({where: {id: id}})
				.then(foundBob => {
					return foundBob.get('projects')[0].name
				})
			})
		})
	)
	t.is(await bobsProject, 'Visionary Project');
})

tearDown();
