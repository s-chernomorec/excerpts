import React, {Component} from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfPages: Math.ceil(this.props.options.excerptsLength / this.props.options.excertpsOnPage) || 1
    }

    this.navigateFirst = this.navigateFirst.bind(this);
    this.navigateLeft = this.navigateLeft.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
    this.navigateLast = this.navigateLast.bind(this);
  }

  componentWillReceiveProps(next) {
    const numberOfPages = Math.ceil(next.options.excerptsLength / next.options.excertpsOnPage) || 1;
    this.setState({numberOfPages: numberOfPages});
  }

  navigateFirst() {
    this.props.navigate(1);
  }

  navigateLeft() {
    const pageNumber = this.props.options.pageNumber;
    if (pageNumber > 1) {
      this.props.navigate(pageNumber - 1);
    }
  }

  navigateRight() {
    const pageNumber = this.props.options.pageNumber;
    const numberOfPages = this.state.numberOfPages;

    if (pageNumber < numberOfPages) {
      this.props.navigate(pageNumber + 1);
    }
  }

  navigateLast() {
    const pageNumber = this.props.options.pageNumber;
    const numberOfPages = this.state.numberOfPages;

    if (pageNumber < numberOfPages) {
      this.props.navigate(numberOfPages);
    }
  }

  render() {

    if (this.props.options.showIfOnlyOnePage !== true && this.state.numberOfPages === 1 && this.props.options.pageNumber === 1) {
      return false;
    }

    return (
      <footer className="page-pagination-wrapper">
        <div className="page-pagination">

          <div className="pagination-block">
            <button className="pagination-btn" onClick={this.navigateFirst}>
              <span className="fa fa-angle-double-left pagination-icon-left"></span>
            </button>
            <button className="pagination-btn" onClick={this.navigateLeft}>
              <span className="fa fa-angle-left pagination-icon-left"></span>
            </button>
          </div>

          <div className="pagination-block pagination-center-block">
            <span className="pagination-page-number">{this.props.options.pageNumber}</span>
          </div>

          <div className="pagination-block">
            <button className="pagination-btn" onClick={this.navigateRight}>
              <span className="fa fa-angle-right pagination-icon-right"></span>
            </button>
            <button className="pagination-btn" onClick={this.navigateLast}>
              <span className="fa fa-angle-double-right pagination-icon-right"></span>
            </button>
          </div>

        </div>
      </footer>
    );
  }
}

export default Pagination;
