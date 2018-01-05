import React, {Component} from 'react'

const LoaderHOC = (propName) => (WrappedComponent) => {
  return class Loader extends Component {
    isEmpty(prop) {
      prop === null ||
      prop === undefined ||
      (prop.hasOwnPropery('length') && prop.length === 0) ||
      (prop.constructor === Object.keys(prop).length === 0)
    }
    render() {
      return this.isEmpty(this.props[propName]) ? <div className='loader'></div> : <WrappedComponent {...this.props} />
    }

  }

}

export default LoaderHOC
