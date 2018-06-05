import React from 'react';
import CardEditor from '../CardEditor/CardEditorLoader';
import ModalLauncher from '../HOC/ModalLauncher';
import { Link } from 'react-router-dom';
import { CLASS_NAME_OBJ } from '../HierarchyControl/CardTypes';

import './CardView.css';

const CardView = (props) => {
  const { card, close, type, navigator, handleDelete, draft } = props;
  const id = card.get('id');
  const self = {id, type};

  return (
    <div
    className={'cardView view'}>
      <h1>
        {card.get('title')}
      </h1>
      <p>
        {card.get('body')}
      </p>
      <div className={'buttonGroup'} >
      <Link to={{
        pathname: '/projects/edit',
        state: {
          card,
          isNewCard: false,
          parent: self,
          type,
          nextIdx: null
        }
      }}
      ><button className='button'>{`edit ${CLASS_NAME_OBJ[type]}`}</button></Link>
      <button className='button' onClick={close}>
        close
      </button>
      </div>
    </div>
  );
};

export default CardView;
