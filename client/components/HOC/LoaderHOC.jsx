import React, {Component} from 'react';
import './addLoader.css';

const isEmpty = (prop) => {
  return prop === null ||
  prop === undefined ||
  (prop.hasOwnPropery && prop.hasOwnPropery('length') && prop.length === 0) ||
  (prop.constructor === Object.keys(prop).length === 0);
};

const LoaderHOC = (propName) => (WrappedComponent) => {
  return class Loader extends Component {
    constructor(props){
      super(props);
    }

    render() {
      return isEmpty(this.props[propName]) ?
      <div className='loader'></div> :
      <WrappedComponent {...this.props} />;
    }
  };
};

export default LoaderHOC;
