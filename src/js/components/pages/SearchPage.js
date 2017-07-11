import React, {Component} from 'react';
import {Page} from '../common/Frames';
import ExcerptList from '../excerpt/ExcerptList';
import {shoulDisplayTitle, sortByDate, search, paginationDataChunk} from '../../helpers';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 1,
      excertpsOnPage: 9
    }

    this.navigate = this.navigate.bind(this);
  }

  navigate(pageNumber) {
    this.setState({pageNumber: pageNumber})
  }

  render() {
    const paginationIsActive = true;
    const excerpts = this.props.excerpts.slice().sort(sortByDate);
    const searchResult = search(this.props.searchQuery, excerpts);

    let slicedExcerpts,
      titleIsProvided;

    if (paginationIsActive === true) {
      slicedExcerpts = paginationDataChunk(searchResult, this.state.excertpsOnPage, this.state.pageNumber);
      titleIsProvided = shoulDisplayTitle(slicedExcerpts);
    } else {
      slicedExcerpts = searchResult;
      titleIsProvided = shoulDisplayTitle(slicedExcerpts);
    }

    const paginationOptions = {
      pageNumber: this.state.pageNumber,
      excertpsOnPage: this.state.excertpsOnPage,
      excerptsLength: searchResult.length,
      showIfOnlyOnePage: false
    }

    return (
      <Page headerTitle={"Search results for: " + this.props.searchQuery} pagination={!!paginationIsActive} options={paginationOptions} navigate={(pageNumber) => this.navigate(pageNumber)} displayStyleIsActive={true} excerptDisplayStyles={this.props.excerptDisplayStyles} excerptDisplayStyleActive={this.props.activeExcerptDisplayStyle} changeDisplayStyle={(style) => this.props.changeDisplayStyle(style)}>
        <ExcerptList excerpts={slicedExcerpts} titleIsProvided={titleIsProvided} removeExcerpt={(excerpt) => this.props.removeExcerpt(excerpt)} editExcerpt={(excerpt) => this.props.editExcerpt(excerpt)} addToFavourites={(id) => this.props.addToFavourites(id)} activeExcerptDisplayClass={this.props.activeExcerptDisplayStyle.class}/>
      </Page>
    );
  }

}

export default SearchPage;
