import {
  ProjectContainer,
  ActContainer,
  SequenceContainer,
  SceneContainer,
  BeatContainer
} from '../index.jsx';
import React from 'react';

const HierarchyControl = (props) => {
  const { project } = props; //activeProject, activeAct, activeSequence, activeScene, loader
  //these are temporary for testing and need to be replaced.
  const forProjects = project.get('userProjects').toArray();
  const forActs = project.getIn(['userProjects', '0 project test', 'acts']).toArray();
  const forSequences = project.getIn(['userProjects', '0 project test', 'acts', '1', 'sequences']).toArray();
  // const forScenes = project.getIn(['userProjects', activeSequence, 'scenes']).toArray();
  // const forBeats = project.getIn(['userProjects', activeScene, 'beats']).toArray();
  const forScenes = null;
  const forBeats = null;
  const loader = console.log;

  //possibly a switch to decide what gets rendered instead of targetProp &&...

  return (
    <ProjectContainer
        type="project"
        thumbs={forProjects}
        onClick={loader}
      >
        <ActContainer
          type='act'
          thumbs={forActs}
          onClick={loader}
        >
          <SequenceContainer
            type='sequence'
            thumbs={forSequences}
            onClick={loader}
            >
            <SceneContainer
              type='scene'
              thumbs={forScenes}
              onClick={loader}
            >
              <BeatContainer 
              type='beat'
              thumbs={forBeats}
              onClick={loader}
              />
            </SceneContainer>
          </SequenceContainer>
        </ActContainer>
      </ProjectContainer>
  );
};

export default HierarchyControl;
