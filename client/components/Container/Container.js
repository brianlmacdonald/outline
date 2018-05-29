import React from 'react';
import { connect } from 'react-redux';
import CardEditor from '../CardEditor/CardEditorLoader';
import './Container.css';

import {
  CLASS_NAME_OBJ
} from '../HierarchyControl/CardTypes';

const EmptyProp = (type) => () => {
  return (<div>please add {CLASS_NAME_OBJ[type]}</div>);
};
//make this a HOC that takes button and subBontainer.

const addMaxWidth = (bool) => {
  if (bool) return 'container navView';
  else return 'container';
};

const Container = (Button) => (SubContainer, isNavView) => (props) => {
    const {
      type,
      children,
      thumbs,
      } = props;

    return (
      <div name={CLASS_NAME_OBJ[type]} className={CLASS_NAME_OBJ[type]}>
        <div className={addMaxWidth(isNavView)}>
          <Button nextIdx={thumbs.size} {...props} />
          <SubContainer {...props} empty={EmptyProp(type)} />
        </div>
        <div>
          {children}
        </div>
      </div>
    );
};

export default Container;
