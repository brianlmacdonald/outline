import React, { Component,  cloneElement } from 'react';
import Modal from './Modal';
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
    const {
      type,
      children,
      styleClass,
      draft,
      card,
      user,
      message,
      handleNavigation,
      isNewCard
    } = this.props;
    const { toggle } = this.state;
    const isEditing = draft.get('type') !== null;
    const isDelete = message === 'delete ';
    
    return (
      <div>
        <button
        disabled={isEditing && !isDelete}
        className={styleClass}
        onClick={() => {
          if (!isNewCard) handleNavigation({id: card.get('id'), userId: user.get('id')});
          this.handleToggleModal();
        }}
          >{message} {CLASS_NAME_OBJ[type]}
          </button>
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
