'use strict';
import test from 'ava';
import { Map, List } from 'immutable';
import project, { 
  projectLoaded,
  projectLoading,
  projectLoadError,
  allProjectsLoaded, 
  allProjectsLoading, 
  allProjectsLoadError
  } from '../project';

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

    t.deepEqual(state, Map());
  });

  test('REDUCER - allProjectsLoading has a loading projects flag', t => {
    const state = project(undefined, allProjectsLoading());
    
    t.deepEqual(state.getIn(['userProjects', 'isFetching']), true);
  });

  test('REDUCER - "project" exists in state after loaded', t => {
    const state = project(undefined, allProjectsLoading());
    const nextState = project(state, allProjectsLoaded(testProjects));

    t.deepEqual(nextState.getIn([
      'userProjects',
      'isFetching']),
      false);

    t.deepEqual(nextState.getIn([
      'userProjects',
      'Mr Mustard']).get('title'),
      testProjects[0].title);
  });

  test('REDUCER - projectLoading has a loading project flag', t => {
    const preState = project(undefined, allProjectsLoading());
    const state = project(preState, allProjectsLoaded(testProjects));

    t.deepEqual(state.getIn([
      'userProjects',
      'Mr Mustard']).get('isFetching'),
      false);

    const nextState = project(state, projectLoading('Mr Mustard'));

    t.deepEqual(nextState.getIn([
      'userProjects',
      'Mr Mustard']).get('isFetching'),
      true);
  });

  test('REDUCER - projectLoaded adds the projects full details', t => {
    const preState = project(undefined, allProjectsLoading());
    const state = project(preState, allProjectsLoaded(testProjects));
    const nextState = project(state, projectLoading('Mr Mustard'));
    const finalState = project(nextState, projectLoaded(loadedProject));

    t.deepEqual(finalState.getIn([
      'userProjects',
      'Mr Mustard']).get('body'),
      'He is a gentleman and a scholar.');

    t.deepEqual(finalState.getIn([
      'userProjects',
      'Mr Mustard']).get('isFetching'),
      false);
  });
