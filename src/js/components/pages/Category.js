import React, {Component} from 'react';
import {Page} from '../common/Frames';
import ExcerptList from '../excerpt/ExcerptList';
import {shoulDisplayTitle, sortByDate, paginationDataChunk} from '../../helpers';

class About extends Component {
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
    const sortedExcerpts = this.props.excerpts.slice().sort(sortByDate);
    const filteredByCategory = sortedExcerpts.filter((excerpt) => excerpt.category.toLowerCase() === this.props.match.params.name.toLowerCase());

    let slicedExcerpts,
      titleIsProvided;

    if (paginationIsActive === true) {
      slicedExcerpts = paginationDataChunk(filteredByCategory, this.state.excertpsOnPage, this.state.pageNumber);
      titleIsProvided = shoulDisplayTitle(slicedExcerpts);
    } else {
      slicedExcerpts = filteredByCategory;
      titleIsProvided = shoulDisplayTitle(slicedExcerpts);
    }

    const paginationOptions = {
      pageNumber: this.state.pageNumber,
      excertpsOnPage: this.state.excertpsOnPage,
      excerptsLength: filteredByCategory.length,
      showIfOnlyOnePage: false
    }

    return (
      <Page headerTitle={"Category: " + this.props.match.params.name} pagination={!!paginationIsActive} options={paginationOptions} navigate={(pageNumber) => this.navigate(pageNumber)} displayStyleIsActive={true} excerptDisplayStyles={this.props.excerptDisplayStyles} excerptDisplayStyleActive={this.props.activeExcerptDisplayStyle} changeDisplayStyle={(style) => this.props.changeDisplayStyle(style)}>
        <ExcerptList excerpts={slicedExcerpts} titleIsProvided={titleIsProvided} removeExcerpt={(excerpt) => this.props.removeExcerpt(excerpt)} editExcerpt={(excerpt) => this.props.editExcerpt(excerpt)} addToFavourites={(id) => this.props.addToFavourites(id)} activeExcerptDisplayClass={this.props.activeExcerptDisplayStyle.class}/>
      </Page>
    );
  }

}

export default About;
