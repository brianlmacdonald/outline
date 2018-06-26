import React from 'react';
import { connect } from 'react-redux';
import 'APP/client/components/Container/Container.css';
import {
  CLASS_NAME_OBJ
} from 'APP/client/components/HierarchyControl/CardTypes';

const EmptyProp = (type) => () => {
  return (<div className='content'><p style={{color: 'whitesmoke'}}>please add {CLASS_NAME_OBJ[type]}</p></div>);
};
//make this a HOC that takes button and subBontainer.

const addMaxWidth = (bool) => {
  if (bool) return 'columns overflow';
  else return 'columns';
};

const Container = (Button) => (SubContainer, isNavView) => (props) => {
    const {
      type,
      children,
      thumbs,
      } = props;

    return (
      <div name={CLASS_NAME_OBJ[type]}>
        <div id={`${type}-container`} className={`${CLASS_NAME_OBJ[type]} columns hoc-container`}>
          <Button className='column' nextIdx={thumbs.size} {...props} />
          <SubContainer {...props} empty={EmptyProp(type)} />
        </div>
        <div>
          {children}
        </div>
      </div>
    );
};

export default Container;
