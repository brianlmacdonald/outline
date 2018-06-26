import React, { Component,  cloneElement } from 'react';
import Modal from 'APP/client/components/HOC/ModalLoader';
import { CLASS_NAME_OBJ } from 'APP/client/components/HierarchyControl/CardTypes';

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
    const {
      type,
      children,
      styleClass,
      draft,
      card,
      user,
      message,
      handleNavigation,
    } = this.props;
    const { toggle } = this.state;
    const isDelete = message === 'delete ';
    
    return (
      <div>
        <button
        className={styleClass}
        onClick={() => {
          if (!isDelete) handleNavigation({id: card.get('id'), userId: user.get('id')});
          this.handleToggleModal();
        }}
          >{message}</button>
        {toggle &&
          <Modal
            draft={draft}
            close={this.handleToggleModal}
            >{cloneElement(children, {
              close: this.handleToggleModal
            })}</Modal>}
      </div>
    );
  }
}

export default ModalLauncher;
