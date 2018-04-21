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
  console.log(project);
  const forProjects = project.get('userProjects').toArray();
  const forActs = project.getIn(['userProjects', '0 project test', 'acts']).toArray();
  const forSequences = project.getIn(['userProjects', '0 project test', 'acts', '1', 'sequences']).toArray();
  // const forScenes = project.getIn(['userProjects', activeSequence, 'scenes']).toArray();
  // const forBeats = project.getIn(['userProjects', activeScene, 'beats']).toArray();
  const loader = console.log;

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
          </SequenceContainer>
        </ActContainer>
      </ProjectContainer>
  );
};

export default HierarchyControl;


/* <SceneContainer
              type='scene'
              thumbs={forScenes}
              onClick={loader}
            >
              <BeatContainer 
              type='beat'
              thumbs={forBeats}
              onClick={loader}
              />
            </SceneContainer>*/