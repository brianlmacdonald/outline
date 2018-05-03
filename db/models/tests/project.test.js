'use strict';
import test, { beforeEach } from 'ava';

const db = require('APP/db');

const testProject = {title: 'test project'};

beforeEach(async t => {
	await db.didSync;
});

test('DB - Project model exists on the db', async t => {
	const dbProject = Promise.resolve(db.models.project);
	t.is(await typeof dbProject, 'object');
});

test('DB - Projects can be created', async t => {
	const { Project } = db;
	let newProjectProperties = Promise.resolve(
		Project.create(testProject)
		.then(project => {
			const properties = {
				title: project.get('title')
			};
			return properties;
		})
	);
	t.deepEqual(await newProjectProperties, {
		title: 'test project'
	});
});

test('DB - Project\'s sequences are loaded when scoped', async t => {
	const { Project, Sequence, Act } = db;
	let id;
	const projectActSequence = Promise.resolve(
		Project.create({title: 'second test'})
		.then(Project => Project.get('id'))
		.then(projectId => {
			id = projectId;
			return Act.create({
				project_id: id
				,title: 'A long time ago'
				,body: 'in a galaxy far, far away...'
			})
      .then(newAct => {
        return Sequence.create({
					act_id: newAct.get('id')
					,title: 'Darth V: bad => good'
				})
        .then(createdAct => {
          return Project.findOne({
						where: {id: id},
						include: [
							{ model: Act.scope('sequences')}
						]
					})
          .then(foundProject => {
            return foundProject
                .get('acts')[0]
								.get('sequences')[0]
								.get('title');
					});
        });
      });
		})
	);
	t.is(await projectActSequence, 'Darth V: bad => good');
});
