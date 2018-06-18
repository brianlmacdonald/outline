import React, {Component} from 'react';
import 'APP/client/components/HOC/addLoader.css';
import { isEmpty, isImmutable } from 'immutable';

const checkIsEmpty = (prop) => {
  return prop === null ||
  prop === undefined ||
  (isImmutable(prop) && prop.isEmpty()) ||
  (prop.hasOwnPropery && prop.hasOwnPropery('length') && prop.length === 0) ||
  (prop.constructor === Object.keys(prop).length === 0);
};

const DefaultEmpty = () => {
  return (<div className='loader'></div>);
};

const LoaderHOC = (propName) => (WrappedComponent) => {
  return class Loader extends Component {
    constructor(props){
      super(props);
    }

    render() {
      const EmptyReturn = this.props.empty ? this.props.empty : DefaultEmpty;
      
      return checkIsEmpty(this.props[propName]) ?
      <EmptyReturn /> :
      <WrappedComponent {...this.props} />;
    }
  };
};

export default LoaderHOC;
