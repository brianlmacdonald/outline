import React from 'react';
import { connect } from 'react-redux';
import CardEditor from '../CardEditor/CardEditorLoader.jsx';
import './Container.css';

import {
  CLASS_NAME_OBJ
} from '../HierarchyControl/CardTypes';

const EmptyProp = (type) => () => {
  return (<div>please add {CLASS_NAME_OBJ[type]}</div>);
};
//make this a HOC that takes button and subBontainer.

const Container = (Button) => (SubContainer) => (props) => {
    const {
      type,
      children,
      thumbs,
      } = props;

    return (
      <div name={CLASS_NAME_OBJ[type]} className={CLASS_NAME_OBJ[type]}>
        <div className='container'>
          <Button nextIdx={thumbs.size} {...props} />
          <SubContainer {...props} empty={EmptyProp(type)} />
        </div>
        <div className='subContainer'>
          {children}
        </div>
      </div>
    );
};

export default Container;
