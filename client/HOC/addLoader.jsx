import React, {Component} from 'react'

const LoaderHOC = (propName) => (WrappedComponent) => {
  return class Loader extends Component {
    constructor(){
      super()
      this.isEmpty = this.isEmpty.bind(this)
    }

    isEmpty(prop) {
      prop === null ||
      prop === undefined ||
      (prop.hasOwnPropery('length') && prop.length === 0) ||
      (prop.constructor === Object.keys(prop).length === 0)
    }
    render() {
      return this.isEmpty(this.props[propName]) ? <div className='loader'><p>loading</p></div> : <WrappedComponent {...this.props} />
    }

  }

}

export default LoaderHOC
