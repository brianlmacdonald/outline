import React from 'react';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import { Thumbnail } from 'APP/client/components/index.jsx';

const ThumbsContainer = props => {
  const {
    handleEdit,
    thumbs,
  } = props;

  return thumbs.map((card, idx) => {
    return (
      <Thumbnail
        {...props}
        card={card}
        key={card.get('id') + 'tnc'}
        id={card.get('id')}
        index={idx}
        handleEdit={() => handleEdit(card)}
      />
    );
  });
};

const WrappedThumbsContainer = LoaderHOC('thumbs')(ThumbsContainer);
export default WrappedThumbsContainer;
