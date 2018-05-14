import React from 'react';
import { Link } from 'react-router-dom';
import { CardView, ModalLauncher } from '../index.jsx';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import './Thumbnail.css';

const Thumbnail = (props) => {
  const {
    draft,
    user, 
    id,
    index,
    parent,
    type,
    card,
    handleNavigation,
    handleView
  } = props;
  const body = card.get('body');
  const title = card.get('title');
  const bodyPrev = body.length > 25 ? body.slice(0, 24) + '...' : body;
  const titlePrev = title.length > 15 ? title.slice(0, 14) + '...' : title;
  const location = card.get('id');
  const userId = user.get('id');

  return (
      <div
        className='thumbnail'
        key={id + 'd'}
        onDoubleClick={() =>{ 
          handleNavigation({
            id: location,
            userId
          });
          }}>
        <h4 key={id + 'h4'}>{titlePrev}</h4>
        <p key={id + 'p'}>{bodyPrev}</p>
        <div>
          <ModalLauncher
          message={'open '}
          isEditing={draft.get('type')}
          styleClass={'button'}
          type={type}>
            <CardView {...props} />
          </ModalLauncher>
        </div>
      </div>
  );
};

export default LoaderHOC('id')(Thumbnail);
