import React from 'react';
import { Link } from 'react-router-dom';
import { CardView, ModalLauncher } from '../index.jsx';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import './Thumbnail.css';
import {
  PROJECT_NAV,
  ACT_NAV,
  SEQUENCE_NAV,
  SCENE_NAV,
  BEAT_NAV,
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
} from '../../store';
import { TYPE_TO_NAV } from '../HierarchyControl/CardTypes';

const Thumbnail = (props) => {
  const { 
    id,
    index,
    parent,
    type,
    card,
    handleNavigation,
    handleEdit,
    handleView
  } = props;
  const bodyPrev = card.get('body').slice(0, 15) + '...';
  const title = card.get('title');
  const location = type === PROJECT_TYPE ? id : index;

  return (
      <div key={id + 'd'}
        onDoubleClick={() => handleNavigation({
          type: TYPE_TO_NAV[type],
          payload:location
          })}
        className='thumbnail'>
        <h4 key={id + 'h4'}>{title}</h4>
        <p key={id + 'p'}>{bodyPrev}</p>
        <div>
          <ModalLauncher
          styleClass={'openButton'}
          type={type}>
            <CardView {...props} />
          </ModalLauncher>
        </div>
      </div>
  );
};

export default LoaderHOC('id')(Thumbnail);
