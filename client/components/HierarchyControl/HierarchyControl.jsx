import {
  ProjectContainer,
  ActContainer,
  SequenceContainer,
  SceneContainer,
  BeatContainer
} from '../index.jsx';
import React from 'react';
import { projectPayload } from '../../store/reducers/tests/superState';//for dev purps only. delete later
 
const HierarchyControl = (props) => {
  const { project } = props; //activeProject, activeAct, activeSequence, activeScene, loader
  //these are temporary for testing and need to be replaced.
  const forProjects = project.get('userProjects').toArray();
  const forActs = project.getIn(['userProjects', projectPayload[0].id, 'acts']).toArray();
  const forSequences = project.getIn(['userProjects', projectPayload[0].id, 'acts', '1', 'sequences']).toArray();
  // const forScenes = project.getIn(['userProjects', activeSequence, 'scenes']).toArray();
  // const forBeats = project.getIn(['userProjects', activeScene, 'beats']).toArray();
  const forScenes = null;
  const forBeats = null;
  const addNewCard = console.log;

  //possibly a switch to decide what gets rendered instead of targetProp &&...

  return (
    <ProjectContainer
        type="project"
        thumbs={forProjects}
        handleAdd={addNewCard}
      >
        <ActContainer
          type='act'
          thumbs={forActs}
          handleAdd={addNewCard}
        >
          <SequenceContainer
            type='sequence'
            thumbs={forSequences}
            handleAdd={addNewCard}
            >
            <SceneContainer
              type='scene'
              thumbs={forScenes}
              handleAdd={addNewCard}
            >
              <BeatContainer 
              type='beat'
              thumbs={forBeats}
              handleAdd={addNewCard}
              />
            </SceneContainer>
          </SequenceContainer>
        </ActContainer>
      </ProjectContainer>
  );
};

export default HierarchyControl;
