import React from 'react';
import { Link } from 'react-router-dom';

const Thumbnail = (props) => {
  const { 
    title, 
    description,
    userName,
    userId,
    projectName,
    projectId
  } = props;

  return (
    <Link to={`/editor/${userName} + ${userId}/${projectName} + ${projectId}`}>
      <div className='thumbnail'>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Thumbnail;
