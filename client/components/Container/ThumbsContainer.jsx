import React from 'react';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import { Thumbnail } from 'APP/client/components/index.jsx';

const ThumbsContainer = props => {
  const {
    thumbs,
  } = props;
  console.log(thumbs);
  return thumbs.map((card, idx) => {
    return (
      <Thumbnail
        {...props}
        card={card}
        key={card.get('id') + 'tnc'}
        id={card.get('id')}
        index={idx}
      />
    );
  });
};

const WrappedThumbsContainer = LoaderHOC('thumbs')(ThumbsContainer);
export default WrappedThumbsContainer;
