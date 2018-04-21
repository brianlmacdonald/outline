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
  createDraft,
  discardDraft,
  savingDraft,
  draftSaved,
  errorSavingDraft
  } from '../project';

  const defaultState = Map({
    isFetching: false,
    draftProjects: Map({}),
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
      testProjects[0].title]).get('title'),
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
    const nextState = project(state, projectLoading({title: 'Mr Mustard'}));
    const finalState = project(nextState, projectLoaded(loadedProject));

    t.deepEqual(finalState.getIn([
      'userProjects',
      'Mr Mustard']).get('body'),
      loadedProject.body);

    t.deepEqual(finalState.get('isFetching'),
      false);
  });

  test('REDUCER - createDraft creates a draft in draftProjects', t => {
    const preState = project(undefined, createDraft(loadedProject));
    t.deepEqual(preState.getIn([
      'draftProjects',
      loadedProject.title
    ]).get('body'),
      loadedProject.body);
  });

  test('REDUCER - discardDraft deletes the specific draft ONLY', t => {
    const preState = project(undefined, createDraft(testProjects[0]));
    const currentState = project(preState, createDraft(testProjects[1]));
    const nextState = project(currentState, discardDraft(testProjects[0]));
    t.deepEqual(nextState.getIn([
      'draftProjects',
      testProjects[0].title
    ]),
      undefined);
    t.deepEqual(nextState.getIn([
      'draftProjects',
      testProjects[1].title
    ]).get('title'),
    testProjects[1].title);
  });

  const bigProjectPayloadFunction = (num) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
      const fakeProject = {
        title: i + ' project test',
        id: uuid(),
        acts: [
          {
            title: 'one',
            id: uuid(),
            body: i + ' act one',
            sequences: [
              {
                title: 'one',
                id: uuid(),
                body: i + ' sequence one',
                scenes: [
                  1, 2, 3, 4, 5
                ]
              }, {
                title: 'two',
                id: uuid(),
                body: i + ' sequence two',
                scenes: [6, 7, 8, 9, 10]
              }
            ]
          }, {
            title: 'two',
            id: uuid(),
            body: i + ' act two',
            sequences: [
              {
                title: 'three',
                id: uuid(),
                body: i + ' sequence three',
                scenes: []
              }, {
                title: 'four',
                id: uuid(),
                body: i + ' sequence four',
                scenes: []
              },
              {
                title: 'five',
                id: uuid(),
                body: i + ' sequence five',
                scenes: []
              }, {
                title: 'six',
                id: uuid(),
                body: i + ' sequence six',
                scenes: []
              }
            ]
          }, {
            title: 'three',
            id: uuid(),
            body: i + ' act three',
            sequences: [
              {
                title: 'five',
                id: uuid(),
                body: i + ' sequence seven',
                scenes: []
              }, {
                title: 'six',
                id: uuid(),
                body: i + ' sequence eight',
                scenes: []
              }
            ]
          }
        ]
      };
      arr.push(fakeProject);
    }
    return arr;
  };

  const projectPayload = bigProjectPayloadFunction(4);
  test('REDUCER - correctly access and render projects', t => {
    const superState = project(undefined, allProjectsLoaded(projectPayload));
    console.log(superState.get('userProjects').keySeq());
    t.deepEqual(superState.get('userProjects').keySeq().toArray(), [ "0 project test", "1 project test", "2 project test", "3 project test" ]);
  });


