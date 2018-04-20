import {
  ProjectContainer,
  ActContainer,
  SequenceContainer,
  SceneContainer,
  BeatContainer
} from '../index.jsx';

const HierarchyControl = (props) => {
  const {project} = props;
  const forProjects = project.getIn(['userProjects'])

  return (
    <ProjectContainer
        type="project"
        thumbs={project}
        onClick={handleLoad}
      >
        <ActContainer type='act'>
          <SequenceContainer type='sequence'>
            <SceneContainer type='scene'>
              <BeatContainer type='beat' />
            </SceneContainer>
          </SequenceContainer>
        </ActContainer>
      </ProjectContainer>
  );
};