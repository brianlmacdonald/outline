'use strict';
import React, { Component } from 'react';
import Display from '../Display/Display.jsx';
import { toJS } from 'immutable';

class User extends Component {
  constructor(props){
    super(props);
  }

  render({props}){
    const { projects } = this.props;
    const userName = user.get('name');

    return(
      <Display
      title={userName}
      body='available projects'
      subordinates={toJS(projects.get('userProjects'))}
      />
    );


  }
}

const mapState = state => ({
  projects: state.projects,
  user: state.user
});

const mapDispatch = dispatch => ({

})