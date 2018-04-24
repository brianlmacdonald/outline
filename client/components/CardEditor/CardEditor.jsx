'use strict';
import React from 'react';

const CardEditor = (props) => {
  const { handleEdit, card } = props;

  return (
    <div
    className={'cardEditor'}>
      <h1>
        {card.get('title')}
      </h1>
      <p>
        {card.get('body')}
      </p>
    </div>
  );
};

export default CardEditor;

