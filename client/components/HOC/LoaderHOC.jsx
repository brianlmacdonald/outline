import React, {Component} from 'react';
import 'addLoader.css';

const isEmpty = (prop) => {
  return prop === null ||
  prop === undefined ||
  (prop.hasOwnPropery('length') && prop.length === 0) ||
  (prop.constructor === Object.keys(prop).length === 0);
};

const LoaderHOC = (loadingCheck) => (WrappedComponent) => {
  return class Loader extends Component {

    render() {
      return isEmpty(this.props[loadingCheck]) ?
      <div className='loader'></div> :
      <WrappedComponent {...this.props} />;
    }

  };

};

export default LoaderHOC;
