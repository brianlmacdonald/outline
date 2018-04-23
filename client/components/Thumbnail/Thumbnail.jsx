import React from 'react';
import { Link } from 'react-router-dom';
import { CardView, ModalLauncher } from '../index.jsx';
import LoaderHOC from '../HOC/LoaderHOC.jsx';

//each Thumbnail should maybe have a modal that pops up the full view and edit.
//it could also be something else-- that rearranges the information to show only what you'd need.
//Following previous scene, following scene, relevant beats.
//might be a good spot for visualization.
const Thumbnail = (props) => {
  const { 
    id,
    card,
    handleSelect,
    handleEdit,
    handleView
  } = props;
  const bodyPrev = card.get('body').slice(0, 15) + '...';
  const title = card.get('title');

  return (
      <div key={id}
        className='thumbnail'>
        <h4 key={id}>{title}</h4>
        <p key={id}>{bodyPrev}</p>
        <div>
          <ModalLauncher>
            <CardView {...props} />
          </ModalLauncher>
        </div>
      </div>
  );
};

export default LoaderHOC('id')(Thumbnail);
