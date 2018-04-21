import React from 'react';
import { Link } from 'react-router-dom';


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

export default Thumbnail;
