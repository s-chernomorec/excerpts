import _ from 'lodash';
import React, {Component} from 'react';
import {Page} from '../common/Frames';
import ExcerptList from '../excerpt/ExcerptList';
import {shoulDisplayTitle, excerptsNumberToSlice, sortByDate, paginationDataChunk} from '../../helpers';

class Latest extends Component {
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
    const excerpts = this.props.excerpts.slice();
    const sortedExcerpts = excerpts.sort(sortByDate);

    let slicedExcerpts,
      titleIsProvided;

    if (paginationIsActive === true) {
      slicedExcerpts = paginationDataChunk(sortedExcerpts, this.state.excertpsOnPage, this.state.pageNumber);
      titleIsProvided = shoulDisplayTitle(slicedExcerpts);
    } else {
      slicedExcerpts = sortedExcerpts;
      titleIsProvided = shoulDisplayTitle(slicedExcerpts);
    }

    const paginationOptions = {
      pageNumber: this.state.pageNumber,
      excertpsOnPage: this.state.excertpsOnPage,
      excerptsLength: sortedExcerpts.length,
      showIfOnlyOnePage: false
    }

    return (
      <Page headerTitle="Latest" pagination={!!paginationIsActive} options={paginationOptions} navigate={this.navigate} displayStyleIsActive={true} excerptDisplayStyles={this.props.excerptDisplayStyles} excerptDisplayStyleActive={this.props.activeExcerptDisplayStyle} changeDisplayStyle={(style) => this.props.changeDisplayStyle(style)}>
        <ExcerptList excerpts={slicedExcerpts} titleIsProvided={titleIsProvided} removeExcerpt={(excerpt) => this.props.removeExcerpt(excerpt)} editExcerpt={(excerpt) => this.props.editExcerpt(excerpt)} addToFavourites={(id) => this.props.addToFavourites(id)} activeExcerptDisplayClass={this.props.activeExcerptDisplayStyle.class}/>
      </Page>
    );
  }
}

export default Latest;
