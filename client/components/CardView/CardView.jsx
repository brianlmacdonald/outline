import React from 'react';

const CardView = (props) => {
  const { handleEdit, card } = props;

  return (
    <div
    className={'cardView'}>
      <h1>
        {card.get('title')}
      </h1>
      <p>
        {card.get('body')}
      </p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default CardView;
