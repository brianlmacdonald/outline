import React from 'react';
import { Link } from 'react-router-dom';
import { CardView, ModalLauncher } from '../index.jsx';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import './Thumbnail.css';

//each Thumbnail should maybe have a modal that pops up the full view and edit.
//it could also be something else-- that rearranges the information to show only what you'd need.
//Following previous scene, following scene, relevant beats.
//might be a good spot for visualization.
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
  const location = type === 'project' ? id : index;

  return (
      <div key={id}
        onDoubleClick={() => handleNavigation(type, location)}
        className='thumbnail'>
        <h4 key={id}>{title}</h4>
        <p key={id}>{bodyPrev}</p>
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
