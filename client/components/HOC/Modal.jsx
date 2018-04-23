import React, { Component } from "react";
import ModalLauncherHOC from "./ModalLauncher.jsx";
import { isNil } from "lodash";
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { close } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        close();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      }
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }

  handleOutsideClick(e) {
    const { close } = this.props;
    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        close();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  }

  render() {
    const { close, children } = this.props;

    return (
      <div className='modal'>
        <div ref={node => (this.modal = node)}>{children}</div>
      </div>
    );
  }
}

export default Modal;
