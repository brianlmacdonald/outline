'use strict';
import test from 'ava';
import { Map, List, Seq } from 'immutable';
import project, {projectLoaded} from '../project';
import navigator, {
  addNavigationPath,
  removeNavigationPath
} from '../navigator';

const testProject = {
  id: 'f1',
  title: 'Best project',
  type: 'project',
  acts: {
    a1: {
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
    a2: {
      id: 'a2',
      title: 'the middle',
      type: 'act'
    },
    a3:{
      id: 'a3',
      title: 'the end',
      type: 'act'
    }
  }
  };

const testState = project(undefined, projectLoaded(testProject));

test('REDUCER - navigator can add to the slug path and correctly find', t => {
  const firstNavigatorState = navigator(
    undefined, addNavigationPath(testProject.type, testProject.id)
  );
  const secondNavigatorState = navigator(
    firstNavigatorState,
    addNavigationPath(
      testProject.acts.a1.type,
      testProject.acts.a1.id
    )
  );
  const projectPath = secondNavigatorState.get('project');
  const actPath = secondNavigatorState.get('act');
  
  t.deepEqual(testState.getIn([
    'userProjects', projectPath, 'title'
  ]), testProject.title);
  t.deepEqual(testState.getIn(['userProjects', projectPath, 'acts', actPath, 'body']), testProject.acts.a1.body);
});

