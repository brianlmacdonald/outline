'use strict';
import test from 'ava';
import uuid from 'uuid';
import { Map, List, Seq } from 'immutable';
import project, { 
  projectLoaded,
  projectLoading,
  projectLoadError,
  allProjectsLoaded, 
  allProjectsLoading, 
  allProjectsLoadError,
  newProjectCreated,
  createNewAct,
  } from '../project';
  import navigator, {
    addNavigationPath
  } from '../navigator';

  import { projectPayload } from './superState';
 
  const defaultState = Map({
    isFetching: false,
    userProjects: Map({})}
  );

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

    t.deepEqual(nextState.getIn([
      'userProjects',
      testProjects[0].id]).get('title'),
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

    t.deepEqual(finalState.getIn([
      'userProjects',
      loadedProject.id]).get('body'),
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
    t.deepEqual(preState.getIn(['userProjects', 4, 'id']), 4);
    t.deepEqual(typeof preState.getIn(['userProjects', 4]), 'object');
    const firstPayload = ['userProjects', 4, 'acts', 0];
    t.deepEqual(firstPayload[firstPayload.length - 1], 0);
    const nextState = project(preState, createNewAct(firstPayload));
    const secondPayload = ['userProjects', 4, 'acts', 1];
    t.deepEqual(nextState.getIn([
      'userProjects',
      4,
      'acts',
      0,
      'type'
      ]), 'ACT_TYPE');
    t.deepEqual(nextState.getIn([
      'userProjects',
      4,
      'acts'
      ]).toArray().length, 1);
    t.deepEqual(nextState.getIn([
      'userProjects',
      4,
      'type'
      ]), 'PROJECT_TYPE');
    const finalState = project(nextState, createNewAct(secondPayload));
    t.deepEqual(finalState.getIn([
      'userProjects',
      4,
      'acts',
      1,
      'type'
      ]), 'ACT_TYPE');
    t.deepEqual(finalState.getIn([
      'userProjects',
      4,
      'acts'
      ]).toArray().length, 2);

  });
