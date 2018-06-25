'use strict';
import React, { Component } from 'react';
import history from 'APP/client/history.js';
import { withRouter } from 'react-router';
import { PROJECT_TYPE, creatingNewProject } from 'APP/client/store/reducers/project';
import { persistToDB } from 'APP/client/store/actions/project';
import { deleteFromDB } from 'APP/client/store/actions/deleteAction';
import {
  CARD_TYPE_ID,
  CARD_TYPE_PARENT,
  CARD_TYPE_ACTS,
  CARD_TYPE_BEATS,
  CARD_TYPE_SCENES,
  CARD_TYPE_SEQUENCES,
  CARD_TYPE_INDEX,
  CARD_TYPE_BODY,
  CARD_TYPE_TITLE,
  CARD_TYPE_TYPE,
  updateCard,
  discardDraft,
  createNewDraftCard,
} from 'APP/client/store/reducers/draft';
import { connect } from 'react-redux';
import axios from 'axios';
import { Map } from 'immutable';
import type { ProjectPathArray } from 'APP/Types/Project';// eslint-disable-line
import 'APP/client/components/CardEditor/CardEditor.css';
import ModalLauncher from 'APP/client/components/HOC/ModalLauncherLoader';
import DeleteDialog from 'APP/client/components/CardEditor/DeleteDialog';
import {CLASS_NAME_OBJ} from 'APP/client/components/HierarchyControl/CardTypes';

class CardEditor extends Component {
  constructor(props){
    super(props);
    this.ifNullEmptyString = this.ifNullEmptyString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      card: this.props.location.state.card,
      isNewCard: this.props.location.state.isNewCard,
      type: this.props.location.state.type,
      parent: this.props.location.state.parent,
      nextIdx: this.props.location.state.nextIdx
    }
  }

  componentDidMount(){
    const {
      handleNewProject,
      handleNewCard,
      handleNavigation,
      project,
      user,
    } = this.props;
    const {
      card,
      isNewCard,
      type,
      parent,
      nextIdx
    } = this.state;

    if (isNewCard && type === PROJECT_TYPE) {
      handleNewProject(user.get('id'));
    } else if (isNewCard) {
      handleNewCard(Map({type, parent: parent.id, title: `untitled ${CLASS_NAME_OBJ[type]}`, body: '', index: nextIdx}))
    } else {
      handleNewCard(card);
    }

    const leaveMessage = 'You haven\'t saved. Discard changes?';

    this.exitBlocker = (event) => {
      if (this.props.draft.get('type')) {
        event.returnValue = leaveMessage;
        return leaveMessage;
      }
    };

    window.addEventListener('beforeunload', this.exitBlocker);

    this.unblock = history.block((location, action) => {
      const isEditing = this.props.draft.get('type') !== null;
      if (isEditing) return 'You haven\'t saved. Discard changes?';
      else return;
    });
  }

  componentWillUnmount(){
    this.props.handleDiscard();
    window.removeEventListener('beforeunload', this.exitBlocker);
    this.unblock();
  }

  ifNullEmptyString(value) {
    return value === null ? '' : value;
  }

  ifNullNoRender(value) {
    //fill in for later;
  }

  handleSubmit(password){
    const { handleDelete, user, draft, navigator, history } = this.props;
    const { type } = this.state;
    const userObject = {
      id: user.get('id'),
      email: user.get('email'),
      password,
    };
    const cardObj = {
      type,
      id: draft.get('id')
    };
    const projectId = navigator.get(PROJECT_TYPE);
    const deleteObject = { user: userObject, card: cardObj, projectId };
    
    handleDelete(deleteObject);
  }

  render() {
    const {
      draft,
      navigator,
      user,
      handleSave,
      handleCancel,
      handleChange,
      history
    } = this.props;
    const { parent, type, isNewCard } = this.state;
    const saveObject = { 
      isNewCard,
      parent,
      draft,
      userId: user.get('id'),
      projectId: navigator.get(PROJECT_TYPE)
      };

    return (
      <div className={'card-view editor'}>
        <div className={'editorFields'}>
          <input
            className='titleField'
            value={this.ifNullEmptyString(draft.get('title'))}
            type="text"
            onChange={(evt) => {
              handleChange(CARD_TYPE_TITLE)(evt.target.value)
            }}
          />
          <textarea
            className='bodyField'
            value={this.ifNullEmptyString(draft.get('body'))}
            onChange={(evt) => {
              handleChange(CARD_TYPE_BODY)(evt.target.value);
              }}
          />
          </div>
          <div className='buttonGroup'>
            <button
              className='button'
              onClick={() => handleSave(saveObject)}>
              save
            </button>
            <button className={'button'} onClick={() => handleCancel(history, this.unblock)}>
              cancel
            </button>
            {!isNewCard && <ModalLauncher
              draft={draft}
              styleClass={'button'}
              type={type}
              message={'delete '}
            ><DeleteDialog handleSubmit={this.handleSubmit} {...this.props}/>
            </ModalLauncher>}
          </div>
      </div>
    );
  }
}

const MapDispatch = dispatch => ({
  handleNewProject(userId){
    return dispatch(creatingNewProject(userId));
  },
  handleNewCard(newCard){
    dispatch(createNewDraftCard(newCard))
  },
  handleSave(saveObj){
    dispatch(persistToDB(saveObj));
  },
  handleCancel(history, unblock){
    unblock()
    history.push('/projects');
    dispatch(discardDraft());
  },
  handleReset(){
    //reload the card from project
  },
  handleDelete(deleteObj){
    dispatch(deleteFromDB(deleteObj))
    dispatch(discardDraft());
  },
  handleDiscard(){
    dispatch(discardDraft());
  },
  handleChange(cardType){
    return (value) => {
      dispatch(updateCard(cardType, value))
    };
  }
});

const ConnectedCardEditor = connect(null, MapDispatch)(CardEditor);
export default ConnectedCardEditor;
