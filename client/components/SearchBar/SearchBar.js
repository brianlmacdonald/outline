'use strict';
import React, { Component } from 'react';
import Suggestions from 'APP/client/components/SearchBar/Suggestions';
import { debounce } from 'lodash';
import findRelevant from 'APP/client/components/SearchBar/findRelevant';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      results: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(){
    const { navigator, project } = this.props;
    const currentProject = project.get('userProjects').find((proj) => proj.get('id') === navigator.get('PROJECT_TYPE'));

    if (currentProject === undefined) return;
    
    this.setState({
      query: this.search.value
    }, debounce(() => {
      if (this.state.query && this.state.query.length > 1) {
          this.setState({results: findRelevant(currentProject, this.state.query)});
      }
    }), 500);
  }

  render(){
    const { navigator } = this.props;
    const disable = navigator === undefined || navigator.get('PROJECT_TYPE' === null);

    return (
      <form>
        <input
          placeholder='search for...'
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results}/>
      </form>
    );
  }

}

export default Search;
