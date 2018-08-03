import React, { Component } from 'react';
import 'APP/client/components/HOC/Modal.css';

function isNil(value) {
  return value == null;
}

class Modal extends Component {
  constructor(props) {
    super(props);
    
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { close, draft } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        close();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      }
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }

  handleOutsideClick(e) {
    const { close, draft } = this.props;
    
    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        close();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }

  render() {
    const { children } = this.props;
    
    return (
      <div className='modal-index-card'>
        <div
          ref={node => (this.modal = node)}
          >{children}</div>
      </div>
    );
  }
}

export default Modal;
