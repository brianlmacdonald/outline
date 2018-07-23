'use strict';
import React, { Component } from 'react';
import Suggestions from 'APP/client/components/SearchBar/Suggestions';

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
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo();
        }
      }
    })
  }

  render(){
    return (
      <form>
        <input
          placeholder='search for...'
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }

}

export default Search;
