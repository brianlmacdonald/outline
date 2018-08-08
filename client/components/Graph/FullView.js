'use strict';
import React from 'react';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import { PROJECT_TYPE } from 'APP/client/store/reducers/project';
import 'APP/client/components/Graph/FullView.css';

const FullView = (props) => {
  const { project, navigator } = props;
  const id = navigator.get(PROJECT_TYPE);
  if (id === null) {
    return (<div className='fullView'><h1>please select a project in the project navigator</h1></div>);
  }

  const activeProject = project.get('userProjects').find(proj => proj.get('id') === id);
  const canRender = (element, subElement) => element.get(subElement) !== undefined;
  return(
    <div className='full-view content'>
      <h1>{activeProject.get('title')}</h1>
      <p>{activeProject.get('body')}</p>
      {activeProject.get('acts').sortBy(a => a.get('index')).map(act => {
        return (<div className='full-card' key={'fv-act-' + act.get('id')}>
          <h1>{act.get('title')}</h1>
          <p>{act.get('body')}</p>
          {canRender(act, 'sequences') && act.get('sequences').sortBy(a => a.get('index')).map(sequence => {
            return (<div className='full-card' key={'fv-sequence-' + sequence.get('id')}>
            <h2>{sequence.get('title')}</h2>
            <p>{sequence.get('body')}</p>
            {canRender(sequence, 'scenes') && sequence.get('scenes').sortBy(a => a.get('index')).map(scene => {
              return (<div className='full-card' key={'fv-scene-' + scene.get('id')}>
              <h3>{scene.get('title')}</h3>
              <p>{scene.get('body')}</p>
              {canRender(scene, 'beats') && scene.get('beats').sortBy(a => a.get('index')).map(beat => {
                return (<div className='full-card' key={'fv-beat-' + beat.get('id')}>
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
