import React from 'react';
import { Link } from 'react-router-dom';
import LoaderHoc from '../HOC/LoaderHOC.jsx';

//each Thumbnail should maybe have a modal that pops up the full view and edit.
//it could also be something else-- that rearranges the information to show only what you'd need.
//Following previous scene, following scene, relevant beats.
//might be a good spot for visualization.
const Thumbnail = (props) => {
  const { 
    id,
    title,
    body,
    handleClick
  } = props;
  const bodyPrev = body.slice(0, 15) + '...';

  return (
      <div key={id}
        className='thumbnail'
        onClick={handleClick}>
        <h4 key={id}>{title}</h4>
        <p key={id}>{bodyPrev}</p>
      </div>
  );
};

export default LoaderHoc('title')(Thumbnail);
