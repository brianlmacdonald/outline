import React from 'react';
import { Link } from 'react-router-dom';


const Thumbnail = (props) => {
  const { 
    title,
    body,
    handleClick
  } = props;
  const bodyPrev = body.slice(0, 15) + '...';

  return (
      <div
        className='thumbnail'
        onClick={handleClick}>
        <p>{title}</p>
        <p>{bodyPrev}</p>
      </div>
  );
};

export default Thumbnail;
