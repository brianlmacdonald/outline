import React from 'react';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import { Thumbnail } from 'APP/client/components/index.jsx';

const ThumbsContainer = props => {
  const {
    type,
    handleNavigation,
    handleEdit,
    thumbs,
    parent
  } = props;
  return thumbs.map((card, idx) => {
    return (
      <Thumbnail
        key={card.get('id') + 'tnc'}
        id={card.get('id')}
        index={idx}
        type={type}
        card={card}
        parent={parent}
        handleNavigation={handleNavigation}
        handleEdit={() => handleEdit(card)}
      />
    );
  });
};

const WrappedThumbsContainer = LoaderHOC('thumbs')(ThumbsContainer);
export default WrappedThumbsContainer;
