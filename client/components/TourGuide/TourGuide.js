'use strict';
import React, { Component } from 'react';
import 'APP/client/components/TourGuide/TourGuide.css';

export const tourConnect = (config) => (Component) => {

  return class Tour extends Component {
    constructor(props){
      console.log('construct is here', config);
      super(props);
      this.state = {
        currentStepKey: 0,
        steps: config,
        active: true,
      };
      this.createTourBubble = this.createTourBubble.bind(this);
      this.destroyTourBubble = this.destroyTourBubble.bind(this);
      this.isLastStep = this.isLastStep.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleForwardOrBack = this.handleForwardOrBack.bind(this);
    }

    handleClose() {
      this.destroyTourBubble();
    }

    createTourBubble(){
      console.log('creating', this.state);
      const { steps, currentStepKey } = this.state;
      const currentBubble = steps[currentStepKey];
      const bubble = document.createElement('span');
      bubble.className = 'bubble';
      bubble.id = `${currentBubble.id}_tour`;
      const content = document.createTextNode(currentBubble.description);
      const backButton = currentStepKey > 0 ? document.createElement('button') : null;
      const forwardButton = !this.isLastStep() ? document.createElement('button') : null;
      const closeButton = document.createElement('button');
      const buttonGroup = document.createElement('div');

      closeButton.innerHTML = 'close';
      closeButton.onclick = this.handleClose;
      bubble.appendChild(content);
      if (backButton) {
        backButton.onclick = () => this.handleForwardOrBack(false);
        backButton.innerHTML = 'back';
        buttonGroup.appendChild(backButton);
      }
      if (forwardButton) { 
        forwardButton.onclick = () => this.handleForwardOrBack(true);
        forwardButton.innerHTML = 'next';
        buttonGroup.appendChild(forwardButton);
      }
      buttonGroup.appendChild(closeButton);
      bubble.appendChild(buttonGroup);

      const target = document.getElementById(currentBubble.id);
      return target.appendChild(bubble);
    }

    destroyTourBubble(){
      console.log('destroying', this.state);
      const { steps, currentStepKey } = this.state;
      const currentBubble = steps[currentStepKey];
      const target = document.getElementById(`${currentBubble.id}_tour`);
      return target.remove();
    }

    componentDidMount(){
      if (this.state.active) return this.createTourBubble();
    }
  
    handleForwardOrBack(increment) {
      this.destroyTourBubble();
      console.log('handling forward or back');
      if (increment) this.setState({currentStepKey: this.state.currentStepKey + 1});
      else this.setState({currentStepKey: this.state.currentStepKey - 1});
      return this.createTourBubble();
    }

    isLastStep(){
      const length = Object.keys(this.state.steps).length - 1;
      if (length <= this.state.currentStepKey) return true;
      else return false;
    }
  
    render(){
      return <Component {...this.props} />;
  
    }
  };

};
