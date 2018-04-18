'use strict';
import React from 'react';

const Editor = (props) => {
  const { displayName, parentId, subordinateIds, handleSubmit, error, name } = props;
  const hasSubordinates = subordinateIds.length !== 0;
  return(
    <div>
      <div>
      </div>      
      <form onSubmit={handleSubmit} name={name}>
        <label>title</label>
        <input name='title' type='text' />
        <label>body</label>
        <input name='body' type='text' />        
      </form>
      {hasSubordinates && subordinateIds.map(id => {

      })}
    </div>
  );
};

