'use strict';
import React, { Component } from 'react';
import Suggestions from 'APP/client/components/SearchBar/Suggestions';
import axios from 'axios';
import 'APP/client/components/SearchBar/SearchBar.css';
import { projectLoaded } from 'APP/client/store/reducers/project';
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      results: [],
      searchAll: true,
      hide: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleSearchDepth = this.handleSearchDepth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState(){
    this.setState({query: '', results: []});
  }

  handleSubmit(){
    const { user, navigator, handleSearchAll } = this.props;
    this.state.searchAll ?
      this.setState({results: handleSearchAll(user.get('id'), this.state.query)}) :
      this.setState({results: searchActive(user.get('id'), navigator.get('PROJECT_TYPE'), this.state.query)});

  }

  handleInputChange(){
    this.setState({ query: this.search.value });
  }

  handleSearchDepth(){
    this.setState({searchAll: !this.state.searchAll})
  }

  render(){

    return (
      <form>
        <div className='field has-addons'>
          <div className='control'>
            <input
              id='search-input'
              className='input'
              placeholder='search for...'
              ref={input => this.search = input}
              onChange={this.handleInputChange}
              onBlur={this.resetState}
            />
          </div>
          <div className='control'>
            <a
              className={`button ${this.state.searchAll ? 'is-info' : 'is-info is-inverted is-outlined'}`}
              onClick={this.handleSearchDepth}
              >
              {'search all'}
            </a>
            <a
              className='button is-success'
              onClick={this.handleSubmit}
              >
              go
            </a>
          </div>
        </div>
        <Suggestions results={this.state.results}/>
      </form>
    );
  }

}

function searchActive(userId, projectId, term) {
  return axios.get(`/api/search/single-project/${userId}/${projectId}/${term}`)
    .then(results => {
      return results.data.hits;
    })
    .catch(console.error)
}

function searchAll(userId, term) {
  return function (dispatch) {
    return axios.get(`/api/search/all-projects/${userId}/${term}`)
      .then(allResults => {
        if (allResults.data.projects.length) {
          allResults.data.projects.forEach(project => {
            dispatch(projectLoaded(project))
          })
        }
        return allResults.data.hits;
      })
      .catch(console.error)
  }
}

const mapDispatch = dispatch => ({
  handleSearchAll: function(userId, term){
    return dispatch(searchAll(userId, term));
  }
});

export default connect(null, mapDispatch)(Search);
