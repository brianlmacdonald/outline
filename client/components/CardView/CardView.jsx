import React from 'react';
import { ModalLauncher, CardEditor } from '../index.jsx';

const CardView = (props) => {
  const { card, close, type, navigator, handleDelete } = props;
  const id = card.get('id');
  const self = {id, type};
  //cardview edit, parent is self for the card.
  return (
    <div
    className={'cardView'}>
      <h1>
        {card.get('title')}
      </h1>
      <p>
        {card.get('body')}
      </p>
      <ModalLauncher
        message={`edit `}
        type={type}
        isEditing={true}
        styleClass={'editButton'}
      >
        <CardEditor
          {...props}
          type={type}
          newCard={false}
          parent={self}/>
      </ModalLauncher>
    </div>
  );
};

export default CardView;
