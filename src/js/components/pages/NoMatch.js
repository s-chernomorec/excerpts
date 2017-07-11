import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
      <div className="no-match-wrapper">
        <div className="no-match-404">
          <h1>404</h1>
        </div>
        <div className="no-match-index-link">
          <Link to="/">Return to main page</Link>
        </div>
      </div>
    );
  }
}

export default NoMatch;
