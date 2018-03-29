import test, { beforeEach } from 'ava';

const { setUp, tearDown } = require('./setupFunctions');
setUp();
const db = require('APP/db');

beforeEach(async t => {
	await db.didSync;
})

const standardUser = {
	firstName: "Bob",
	lastName: 'Squatson',
	email: 'sqautsypoo@excite.com',
	password: 'a'
}


test(`User model exists on the db`, async t => {
	const dbUsers = Promise.resolve(db.models.user);
	t.is(await typeof dbUsers, 'object');
});

test(`User's can be created`, async t => {
	const { User } = db;
	let newUserFirstName = Promise.resolve(
		User.create(standardUser)
		.then(user => {
			return user.get('firstName')
		})
	)
	t.is(await newUserFirstName, 'Bob')
})

tearDown();
