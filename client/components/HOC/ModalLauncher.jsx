import React, { Component,  cloneElement } from 'react';
import Modal from './Modal.jsx';
import './ModalLauncher.css';
import { CLASS_NAME_OBJ } from '../HierarchyControl/CardTypes';

class ModalLauncher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  handleToggleModal() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const { type, children, styleClass, isEditing } = this.props;
    const { toggle } = this.state;
    const action = styleClass.slice(0, -6);
    return (
      <div>
        <button
        className={styleClass}
        onClick={
          this.handleToggleModal}
          >{action} {CLASS_NAME_OBJ[type]}
          </button>
        {toggle &&
        <Modal
          isEditing={isEditing}
          close={this.handleToggleModal}
          >{cloneElement(children, {
            close: this.handleToggleModal
            })}</Modal>}
      </div>
    );
  }
}

export default ModalLauncher;
