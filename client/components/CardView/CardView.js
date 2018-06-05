import React from 'react';
import CardEditor from '../CardEditor/CardEditorLoader';
import ModalLauncher from '../HOC/ModalLauncher';
import { Link } from 'react-router-dom';
import { CLASS_NAME_OBJ } from '../HierarchyControl/CardTypes';

import './CardView.css';

const CardView = (props) => {
  const { card, close, type, handleNavigation, user } = props;
  const id = card.get('id');
  const self = {id, type};

  return (
    <div className={'cardView view'}>
      <div className={'fields'}>
      <h1 className='viewTitle'>
        {card.get('title')}
      </h1>
      <p className='viewBody'>
        {card.get('body')}
      </p>
      </div>
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
      ><button
      onClick={() => handleNavigation({id: card.get('id'), userId: user.get('id')})}
      className='button'>{`edit ${CLASS_NAME_OBJ[type]}`}</button></Link>
      <button className='button' onClick={close}>
        close
      </button>
      </div>
    </div>
  );
};

export default CardView;
