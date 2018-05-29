'use strict';
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasError: false,
      windowDraft: null,
      windowProject: null
    };
  }

  componentDidCatch(error, info) {
    const lastDraftSave = window.__OUTLINE_STATE__.draft;
    this.setState({ hasError: true });
    this.setState({windowDraft: lastDraftSave });
  }

  grabDraft(map){

    return (
      <div>
        <h1>To be safe: Copy and Paste Your Draft Somewhere Else</h1>
        <h2>{map.get('title')}</h2>
        <p>{map.get('body')}</p>
      </div>);

  }

  render(){
    if (this.state.hasError) {
      return (
              <div>
                <h1>Something went wrong!</h1>
                {this.state.windowDraft.get('type') ? this.grabDraft(this.state.windowDraft) : <p>try refreshing?</p>}
              </div>
            );
    }
    return this.props.children;
  }
}
