import React from 'react';
import { Link } from 'react-router-dom';
import CardView from 'APP/client/components/CardView/CardView';
import ModalLauncher from 'APP/client/components/HOC/ModalLauncherLoader';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import 'APP/client/components/Thumbnail/Thumbnail.css';

const selectedStyler = (id, activeId) => {
  if (id === activeId) return 'box index-card selected flex';
  else return 'box index-card unselected flex';
};

const ThumbnailClickable = (props) => {
  const {
    draft,
    user, 
    id,
    index,
    parent,
    type,
    card,
    handleNavigation,
    handleView,
    navigator
  } = props;
  const body = card.get('body');
  const title = card.get('title');
  const bodyPrev = body.length > 25 ? body.slice(0, 24) + '...' : body;
  const titlePrev = title.length > 15 ? title.slice(0, 14) + '...' : title;
  const location = card.get('id');
  const userId = user.get('id');

  return (
      <div id={`thumbnail-${type}-${index}`}>
        <div
          title={body}
          className={selectedStyler(location, navigator.get(type))}
          key={id + 'd'}
          onDoubleClick={() => handleNavigation({id: location, userId})}>
          <h4 key={id + 'h4'}>{titlePrev}</h4>
          <p className='body-shape' key={id + 'p'}>{bodyPrev || ''}</p>
          <div className='buttons is-centered is-end'>
            <ModalLauncher
            {...props}
            message='view'
            draft={draft}
            styleClass={'button is-small is-outlined is-info'}
            type={type}>
              <CardView {...props} />
            </ModalLauncher>
          </div>
        </div>
      </div>
  );
};

export default LoaderHOC('id')(ThumbnailClickable);
