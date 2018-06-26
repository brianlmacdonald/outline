import React from 'react';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import ThumbnailClickable from 'APP/client/components/Thumbnail/ThumbnailClickable';
import { CLASS_NAME_OBJ } from 'APP/client/components/HierarchyControl/CardTypes.js'

const ThumbsContainer = props => {
  const { thumbs, navigator, type } = props;

  return (<div className='column columns sub-container'>
   {thumbs.map((card, idx) => (
     <div key={idx} className='column'>
      <ThumbnailClickable
        {...props}
        card={card}
        key={card.get('id') + 'tnc' + type}
        id={card.get('id')}
        index={idx}
      />
      </div>
    )
  )}
  </div>);
};

const WrappedThumbsContainer = LoaderHOC('thumbs')(ThumbsContainer);
export default WrappedThumbsContainer;
