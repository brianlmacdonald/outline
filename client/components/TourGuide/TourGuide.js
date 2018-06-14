'use strict';
import React, { Component } from 'react';
import 'APP/client/components/TourGuide/TourGuide.css';

export const tourConnect = (config) => (Component) => {

  return class Tour extends Component {
    constructor(props){
      super(props);
      this.state = {
        currentStepKey: 0,
        steps: config,
        active: true,
        pathname: props.location.pathname
      };
      this.createTourBubble = this.createTourBubble.bind(this);
      this.destroyTourBubble = this.destroyTourBubble.bind(this);
      this.isLastStep = this.isLastStep.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleForwardOrBack = this.handleForwardOrBack.bind(this);
      this.getTargetPosition = this.getTargetPosition.bind(this);
      this.activateTour = this.activateTour.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
      if (this.props.location.pathname !== prevProps.location.pathname) {
        if (this.state.active && prevState.active) {
          const { steps, currentStepKey, pathname } = this.state;
          const currentBubble = steps[pathname][currentStepKey];
          this.handleClose(currentBubble);
        }
        this.setState({pathname: this.props.location.pathname});
        this.setState({currentStepKey: 0});
      }
      return;
    }

    componentDidMount(){
      return this.createTourBubble();
    }

    handleClose(destroyTarget) {
      this.setState({active: false});
      this.destroyTourBubble(destroyTarget);
    }

    activateTour(){
      const { steps, pathname } = this.state;
      if(!this.state.active){
        if(steps[pathname]) {
          this.setState({active: true});
          this.createTourBubble();
        }
      }
    }

    createTourBubble(){
      const { steps, currentStepKey, pathname } = this.state;
      if (steps[pathname] === undefined) {
        console.error(`closing tour. unable to find tour step with id: ${pathname}`);
        return;
      }

      const currentBubble = steps[pathname][currentStepKey];
      const targetEl = document.getElementById(currentBubble.id);

      if (targetEl === null) {
        console.error(`closing tour. unable to find element with id: ${currentBubble.id}`);
        return;
      }
      const bubble = document.createElement('span');
      const bubbleDiv = document.createElement('div');

      bubble.className = 'tour-bubble';
      bubbleDiv.className = 'tour-bubble-div';
      bubble.id = `${currentBubble.id}-tour`;
      bubbleDiv.id = `${currentBubble.id}-tour-div`;

      const content = document.createTextNode(currentBubble.description);
      const backButton = currentStepKey > 0 ? document.createElement('i') : null;
      const forwardButton = !this.isLastStep() ? document.createElement('i') : null;
      const closeButton = document.createElement('i');
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'tour-button-group';

      closeButton.innerHTML = '&#10006;';
      closeButton.cursor = 'pointer';
      closeButton.onclick = () => {
        this.handleClose(currentBubble);
      };
      bubble.appendChild(content);

      if (backButton) {
        backButton.onclick = () => this.handleForwardOrBack(false);
        backButton.innerHTML = '&larr;';
        backButton.cursor = 'pointer';
        buttonGroup.appendChild(backButton);
      }

      buttonGroup.appendChild(closeButton);

      if (forwardButton) { 
        forwardButton.onclick = () => this.handleForwardOrBack(true);
        forwardButton.innerHTML = '&rarr;';
        forwardButton.cursor = 'pointer';
        buttonGroup.appendChild(forwardButton);
      }

      bubble.appendChild(buttonGroup);

      const elementPosition = this.getTargetPosition(targetEl);

      let bubbleDivStyleText = '';

      bubbleDivStyleText += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
      bubbleDiv.style.cssText = bubbleDivStyleText; 
      bubble.style.top = (elementPosition.height) + 25 + 'px';
      bubbleDiv.append(bubble);
      return targetEl.appendChild(bubbleDiv);
    }

    getTargetPosition(target) {
      const body = document.body;
      const docEl = document.documentElement;
      const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
      const rect = target.getBoundingClientRect();
      return {
        top: rect.top + scrollTop,
        width: rect.width,
        height: rect.height,
        left: rect.left + scrollLeft
      };
    }

    destroyTourBubble(destroyTarget){
      console.log('destroying', this.state);
      const targetBubble = document.getElementById(`${destroyTarget.id}-tour`);
      const targetBubbleDiv = document.getElementById(`${destroyTarget.id}-tour-div`);
      if (targetBubble === null) {
        return;
      }
      if (targetBubbleDiv === null) {
        return;
      }
      targetBubble.remove();
      targetBubbleDiv.remove();
      return;
    }
  
    handleForwardOrBack(increment) {
      const { steps, currentStepKey, pathname } = this.state;
      const currentBubble = steps[pathname][currentStepKey];
      this.destroyTourBubble(currentBubble);
      console.log('handling forward or back');
      if (increment) this.setState({currentStepKey: this.state.currentStepKey + 1});
      else this.setState({currentStepKey: this.state.currentStepKey - 1});
      return this.createTourBubble();
    }

    isLastStep(){
      const { steps, pathname, currentStepKey } = this.state;
      const length = Object.keys(steps[pathname]).length - 1;
      if (length <= currentStepKey) return true;
      else return false;
    }
  
    render(){
      return <Component tour={this.activateTour} {...this.props} />;
  
    }
  };

};
