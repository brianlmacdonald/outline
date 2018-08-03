'use strict';
import React, { Component } from 'react';
import Suggestions from 'APP/client/components/SearchBar/Suggestions';
import 'APP/client/components/SearchBar/SearchBar.css';
import { 
  updateQuery,
  searchAll,
  clearSearch
} from 'APP/client/store/actions/search';
import { searchResultNavigation } from 'APP/client/store/reducers/navigator';
import { connect } from 'react-redux';

function isNil(value) {
  return value == null;
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideResults = this.hideResults.bind(this);
    this.showResults = this.showResults.bind(this);
    this.handleOutsideFormClick = this.handleOutsideFormClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideFormClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideFormClick, false);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { 
      user,
      search,
      handleSearchAll,
    } = this.props;

    const query = search.get('query');
    const userId = user.get('id')
    
    handleSearchAll(userId, query);
  }

  hideResults() {
    this.setState({hide: true});
  }

  showResults() {
    this.setState({hide: false})
  }

  handleInputChange() {
    const { handleUpdateQuery } = this.props;
    handleUpdateQuery(this.search.value);
  }

  handleOutsideFormClick(e) {
    if (!isNil(this.form)) {
      if (!this.form.contains(e.target)) {
        this.hideResults()
      }
    }
  }

  render() {
    const { search, handleNavigation } = this.props;
    if (!search) return <div />

    const results = search.get('results');
    
    return (
      <form
        onFocus={this.showResults}
        ref={node => this.form = node}
        >
        <div
          className='field has-addons'>
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
              className='button is-info'
              onClick={this.handleSubmit}
              >
              go
            </a>
          </div>
        </div>
          <Suggestions
            hide={this.state.hide}
            handleNavigation={handleNavigation}
            results={results}/>
      </form>
    );
  }

}

const mapDispatch = dispatch => ({
  handleUpdateQuery: function(query){
    dispatch(updateQuery(query))
  },
  handleSearchAll: function(userId, term){
    dispatch(clearSearch());
    dispatch(searchAll(userId, term));
  },
  handleNavigation: function(navCard){
    dispatch(searchResultNavigation(navCard));
  }
});

const mapState = state => ({
  search: state.search
});

export default connect(mapState, mapDispatch)(Search);
