'use strict';
import test from 'ava';
import uuid from 'uuid';
import { Map, List, fromJS } from 'immutable';
import project, {
  persistedProject,
  projectLoaded,
  projectLoading,
  projectLoadError,
  allProjectsLoaded, 
  allProjectsLoading, 
  allProjectsLoadError,
  newProjectCreated,
  projectDeleted
  } from '../project';
  import { deletedCard } from '../../actions/deleteAction';
  import navigator, {
    addNavigationPath
  } from '../navigator';
 
  const defaultState = Map({
    'isFetching': false,
    'isSaving': false,
    'userProjects': List([]),
    'trash': List([])
    });

  const testProjects = [
    {title: 'Mr Mustard', id: 1},
    {title: 'Mayhap', id: 2}
  ];

  const loadedProject = {
    title: 'Mr Mustard',
    id: 1,
    body: 'He is a gentleman and a scholar.',
    notes: [{act: 1},{act: 2},{act: 3}]
  };

  test('REDUCER - "project" reducer exists', t => {
    const state = project(undefined, {});

    t.deepEqual(state, defaultState);
  });

  test('REDUCER - allProjectsLoading has a loading projects flag', t => {
    const state = project(undefined, allProjectsLoading());

    t.deepEqual(state.get('isFetching'), true);
  });

  test('REDUCER - "project" exists in state after loaded', t => {
    const state = project(undefined, allProjectsLoading());
    const nextState = project(state, allProjectsLoaded(testProjects));
    t.deepEqual(nextState.get(
      'isFetching'),
      false);

    t.deepEqual(nextState
      .get('userProjects')
      .find(proj => proj.get('id') === 1)
      .get('title'),
      testProjects[0].title);
  });

  test('REDUCER - projectLoading uses loading project flag', t => {
    const preState = project(undefined, allProjectsLoading());
    const state = project(preState, allProjectsLoaded(testProjects));

    t.deepEqual(state.get('isFetching'), false);

    const nextState = project(state, projectLoading({title: 'Mr Mustard'}));

    t.deepEqual(nextState.get('isFetching'), true);
  });

  test('REDUCER - projectLoaded adds the projects full details', t => {
    const preState = project(undefined, allProjectsLoading());
    const state = project(preState, allProjectsLoaded(testProjects));
    const nextState = project(state, projectLoading());
    const finalState = project(nextState, projectLoaded(loadedProject));

    t.deepEqual(finalState
      .get('userProjects')
      .find(proj => proj.get('id') === 1)
      .get('body'),
      loadedProject.body);

    t.deepEqual(finalState.get('isFetching'),
      false);
  });
  const testProjectAlpha = {
    title: 'hi',
    id: 4,
    'body': '',
    type: 'PROJECT_TYPE',
    acts: []
    };

  test('REDUCER - can create a new project', t => {
    const preState = project(undefined, newProjectCreated(testProjectAlpha));
    t.deepEqual(preState
      .get('userProjects')
      .find(p => p.get('id') === 4)
      .get('type'),
      'PROJECT_TYPE');
    t.deepEqual(typeof preState.get('userProjects').find(p => p.get('id') === 4), 'object');
    const firstPayload = ['userProjects', 4, 'acts', 0];
    t.deepEqual(firstPayload[firstPayload.length - 1], 0);

  });


  test('REDUCER - persist actions', t => {
    const preState = project(undefined, newProjectCreated(testProjectAlpha));
    const changedAlpha = preState.get('userProjects').find(proj => proj.get('id') === 4).set('title', 'goodbye');
    const persistedState = project(preState, persistedProject(changedAlpha));
    t.deepEqual(persistedState.get('userProjects').find(p => p.get('id') === 4).get('title'), 'goodbye');
    t.deepEqual(persistedState.get('userProjects').size, 1);
  });

  test('REDUCER - delete action', t => {
    const preState = project(undefined, newProjectCreated(testProjectAlpha));
    const deleteState = project(preState, projectDeleted(4));
    t.deepEqual(preState.get('userProjects').size, 1);
    t.deepEqual(deleteState.get('userProjects').size, 0);
  });
