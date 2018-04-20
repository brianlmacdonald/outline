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
      <div id={title + 'div'}
        className='thumbnail'
        onClick={handleClick}>
        <h4 id={title + 'h4'}>{title}</h4>
        <p id={title + 'p'}>{bodyPrev}</p>
      </div>
  );
};

export default Thumbnail;
