'use strict';
import React, { Component } from 'react';
import Suggestions from 'APP/client/components/SearchBar/Suggestions';
import 'APP/client/components/SearchBar/SearchBar.css';
import { 
  updateQuery,
  toggleSearch,
  searchActive,
  searchAll,
  clearSearch
} from 'APP/client/store/actions/search';
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { 
      user,
      navigator,
      search,
      handleSearchActive,
      handleSearchAll,
    } = this.props;
    const searchAll = search.get('searchAll');
    const query = search.get('query');
    const userId = user.get('id')
    if (searchAll) {
      handleSearchAll(userId, query);
    } else {
      const projectId = navigator.get('PROJECT_TYPE');
      handleSearchActive(uerId, projectId, query);
    }
  }

  hideResults() {
    this.setState({hide: true})
  }

  showResults() {
    this.setState({hide: false})
  }

  handleInputChange() {
    const { handleUpdateQuery } = this.props;
    handleUpdateQuery(this.search.value);
  }

  handleSearchDepth() {
    const { handleToggleSearch } = this.props;
    handleToggleSearch();
  }

  render() {
    const { search } = this.props;
    if (!search) return <div />

    const results = search.get('results');
    const searchAll = search.get('searchAll');
    
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
            />
          </div>
          <div className='control'>
            <a
              className={`button ${searchAll ? 'is-info' : 'is-info is-inverted is-outlined'}`}
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
        {!this.state.hide && <Suggestions results={results}/>}
      </form>
    );
  }

}

const mapDispatch = dispatch => ({
  handleUpdateQuery: function(query){
    dispatch(updateQuery(query))
  },
  handleToggleSearch: function(){
    dispatch(toggleSearch());
  },
  handleSearchAll: function(userId, term){
    dispatch(clearSearch());
    dispatch(searchAll(userId, term));
  },
  handleSearchActive: function(userId, projectId, term){
    dispatch(clearSearch());
    dispatch(searchActive(userId, projectId, term));
  },
});

const mapState = state => ({
  search: state.search
});

export default connect(mapState, mapDispatch)(Search);
