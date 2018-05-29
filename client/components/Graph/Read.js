'use strict';
import React from 'react';
import PROJECT_TYPE from '../../store/reducers/project';

const Read = (props) => {
  const { projects, navigator } = props;
  const forRead = projects.get('userProjects').find(proj => proj.get('id') === navigator.get(PROJECT_TYPE));
  return(
    <div>
      <h1>{forRead.get('title')}</h1>
      <p>{forRead.get('body')}</p>
      {forRead.get('acts').map(act => {
        return (<div>
          <h1>{act.get('title')}</h1>
          <p>{act.get('body')}</p>
          {act.get('sequence').map(sequence => {
            return (<div>
            <h2>{sequence.get('title')}</h2>
            <p>{sequence.get('body')}</p>
            {sequence.get('scenes').map(scene => {
              return (<div>
              <h3>{scene.get('title')}</h3>
              <p>{scene.get('body')}</p>
              {scene.get('beats').map(beat => {
                return (<div>
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