'use strict';
import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail.jsx';

const Display = (props) => {
  const { title, body, type, subordinates, handleEdit } = props;
  const hasSubordinates = subordinates.length !== 0;
  return (
    <div className='display'>
      <p>{type}</p>
      <p>{title}</p>
      <p>{body}</p>
      <button
      onClick={handleEdit}
      >edit</button>
      <div>
        {(hasSubordinates && subordinates.map(sub => {
          return(<Thumbnail
            title={sub.title}
            body={sub.body} />);
        }) )|| <p>no subordinates</p>}
      </div>
    </div>
  );
};

export default Display;
