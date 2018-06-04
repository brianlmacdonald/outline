'use strict';
import React from 'react';
import LoaderHOC from '../HOC/LoaderHOC';
import { PROJECT_TYPE } from '../../store/reducers/project';
import './FullView.css';

const FullView = (props) => {
  const { project, navigator } = props;
  const id = navigator.get(PROJECT_TYPE);
  if (id === null) {
    return (<div className='fullView'><h1>please select a project in the project navigator</h1></div>);
  }

  const activeProject = project.get('userProjects').find(proj => proj.get('id') === id);
  const canRender = (element, subElement) => element.get(subElement) !== undefined;
  return(
    <div className='fullView'>
      <h1>{activeProject.get('title')}</h1>
      <p>{activeProject.get('body')}</p>
      {activeProject.get('acts').sortBy(a => a.get('index')).map(act => {
        return (<div key={'act_' + act.get('id')}>
          <h1>{act.get('title')}</h1>
          <p>{act.get('body')}</p>
          {canRender(act, 'sequences') && act.get('sequences').sortBy(a => a.get('index')).map(sequence => {
            return (<div key={'sequence_' + sequence.get('id')}>
            <h2>{sequence.get('title')}</h2>
            <p>{sequence.get('body')}</p>
            {canRender(sequence, 'scenes') && sequence.get('scenes').sortBy(a => a.get('index')).map(scene => {
              return (<div key={'scene_' + scene.get('id')}>
              <h3>{scene.get('title')}</h3>
              <p>{scene.get('body')}</p>
              {canRender(scene, 'beats') && scene.get('beats').sortBy(a => a.get('index')).map(beat => {
                return (<div key={'beat_' + beat.get('id')}>
                <h4>{beat.get('title')}</h4>
                <p>{beat.get('body')}</p>
                </div>);
              })}
              </div>);
            })}
            </div>);
          })}
        </div>);
      })}
    </div>
  );
};

export default FullView;
