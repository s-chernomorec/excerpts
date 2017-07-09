import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../form/Inputs';
import { Icon } from '../other/Icons';

class Search extends Component {
  constructor(props) {
    super(props);
		
		this.getSearchQuery = this.getSearchQuery.bind(this);
		this.addPlaceHolder = this.addPlaceHolder.bind(this);
		this.removePlaceHolder = this.removePlaceHolder.bind(this);
  }
	
	addPlaceHolder() {
		this.searchInput.placeholder = 'Search';
	}
	
	removePlaceHolder() {
		this.searchInput.placeholder = '';
	}
	
  getSearchQuery(e) {
    const query = this.searchInput.value;
		this.props.getSearchQuery(query);
		this.props.closeAllPopups();
		this.searchInput.value = '';
		this.addPlaceHolder();
  }

  render() {
    return (
      <div className="search-wrapper">
      		<div className="search-block">
						<input type="text" className="search-input" ref={(input) => {this.searchInput = input}} onFocus={this.removePlaceHolder} onBlur={this.addPlaceHolder} placeholder="Search" />
        
      			<button className="search-button" onClick={this.getSearchQuery}><Link to="/search"><Icon fa="search" /></Link></button>
      		</div>
      </div>
    );
  }
}

export default Search;
