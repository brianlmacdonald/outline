import React, { Component } from 'react';
import Modal from './Modal.jsx';
import './ModalLauncher.css';

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
    const { type, children, styleClass} = this.props;
    const { toggle } = this.state;
    const action = styleClass[0] === 'a' ? 'add' : 'open';
    return (
      <div>
        <button
        className={styleClass}
        onClick={this.handleToggleModal}>{action} {type}</button>
        {toggle && <Modal close={this.handleToggleModal}>{children}</Modal>}
      </div>
    );
  }
}

export default ModalLauncher;
