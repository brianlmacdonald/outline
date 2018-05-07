'use strict';
import test from 'ava';
import { Map, List, Seq } from 'immutable';
import project, {
  projectLoaded,
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE
  } from '../project';
import navigator, {
  addNavigationPath,
  removeNavigationPath,
} from '../navigator';

const testProject = {
  id: 'f1',
  title: 'Best project',
  type: 'project',
  acts: [
    {
      id: 'a1',
      title: 'the beginning',
      body: 'disco!',
      type: 'act',
      sequences: {
        s1: {
          id: 's1',
          title: 'establishing',
          type: 'sequence'
        },
        s2: {
          id: 's2',
          title: 'disruption',
          type: 'sequence',
          body: 'double disco!'
        }
      }
    },
    {
      id: 'a2',
      title: 'the middle',
      body: 'no disco.',
      type: 'act'
    },
    {
      id: 'a3',
      title: 'the end',
      body: 'def no disco',
      type: 'act'
    }
  ]
  };

const testState = project(undefined, projectLoaded(testProject));

test('REDUCER - navigator can add to the slug path and correctly find', t => {
  const firstNavigatorState = navigator(
    undefined, addNavigationPath(PROJECT_TYPE, testProject.id)
  );
  const secondNavigatorState = navigator(
    firstNavigatorState,
    addNavigationPath(
      ACT_TYPE,
      0
    )
  );
  const projectPath = secondNavigatorState.get(PROJECT_TYPE);
  const actPath = secondNavigatorState.get(ACT_TYPE);
  
  t.deepEqual(testState.getIn([
    'userProjects', projectPath, 'title'
  ]), testProject.title);
  t.deepEqual(typeof testState
    .getIn([
      'userProjects',
      secondNavigatorState.get(PROJECT_TYPE), 'acts'
      ]).toArray(), 'object');
  t.deepEqual(testState.getIn([
    'userProjects',
    projectPath,
    'acts',
    secondNavigatorState.get(ACT_TYPE), 'body'
    ]), 'disco!');
});
