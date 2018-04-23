import React, { Component } from "react";
import Modal from "./Modal.jsx";

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
    const { type, children } = this.props;
    const { toggle } = this.state;
    return (
      <div>
        <button onClick={this.handleToggleModal}>open</button>
        {toggle && <Modal close={this.handleToggleModal}>{children}</Modal>}
      </div>
    );
  }
}

export default ModalLauncher;
