'use strict';
import test, { beforeEach } from 'ava';

const { setUp } = require('./setupFunctions');
setUp();
const db = require('APP/db');

const testProject = {title: 'test project'}

beforeEach(async t => {
	await db.didSync;
});

test(`DB - Project model exists on the db`, async t => {
	const dbProject = Promise.resolve(db.models.project);
	t.is(await typeof dbProject, 'object');
});

test(`DB - Projects can be created`, async t => {
	const { Project } = db;
	let newProjectProperties = Promise.resolve(
		Project.create(testProject)
		.then(project => {
			const properties = {
				title: project.get('title')
			}
			return properties;
		})
	)
	t.deepEqual(await newProjectProperties, {
		title: 'test project'
	})
});

test(`DB - Project's changes are loaded with the project when scoped`, async t => {
	const { Project, Change, Note } = db;
	let id;
	const projectNotesChange = Promise.resolve(
		Project.create({title: 'second test'})
		.then(Project => Project.get('id'))
		.then(projectId => {
			id = projectId;
			return Note.create({project_id: id, title: `A long time ago`, body: 'in a galaxy far, far away...'})
      .then(newNote => newNote.get('id'))
      .then(noteId => {
        return Change.create({note_id: noteId, title: 'Darth V: bad => good'})
        .then(createdNote => {
          return Project.scope('notes').findOne({where: {id: id}})
          .then(foundProject => {
            return foundProject
                .get('notes')[0]
                .get('changes')[0]
                .get('title');//hooboy!
				  })
        })
      })
		})
	)
	t.is(await projectNotesChange, 'Darth V: bad => good');
});
