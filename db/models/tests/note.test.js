'use strict';
import test, { beforeEach } from 'ava';

const { setUp } = require('./setupFunctions');
setUp();
const db = require('APP/db');

const testNote = {title: 'test', body: 'test in body'};

beforeEach(async t => {
	await db.didSync;
});

test('DB - Note model exists on the db', async t => {
	const dbNote = Promise.resolve(db.models.note);
	t.is(await typeof dbNote, 'object');
});

test('DB - Notes can be created', async t => {
	const { Note } = db;
	let newNoteProperties = Promise.resolve(
		Note.create(testNote)
		.then(note => {
			const properties = {
				title: note.get('title')
				,body: note.get('body')
			};
			return properties;
		})
	);
	t.deepEqual(await newNoteProperties, {
		title: 'test'
		,body: 'test in body'
	});
});

test('DB - Note\'s changes are loaded with the note when scoped', async t => {
	const { Note, Change } = db;
	let id;
	const noteWithChange = Promise.resolve(
		Note.create({title: 'test_2', body: 'test in body_2'})
		.then(note => note.get('id'))
		.then(noteId => {
			id = noteId;
			return Change.create({note_id: id, title: 'change 2 to 3'})
			.then(newChange => {
				return Note.findOne({where: {id: id}})
				.then(foundNote => {
					return foundNote.get('changes')[0].title;
				});
			});
		})
	);
	t.is(await noteWithChange, 'change 2 to 3');
});
