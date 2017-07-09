import React, { Component } from 'react';
import { Page } from '../common/Frames';

class About extends Component {
	
  render() {
    return (
      <Page headerTitle="About" cls="about-page">
        <p className="about-paragraph">This is an open source project which allows you to save notes, categorize them and access whenever needed.</p>
        <p className="about-paragraph">All source code is avaible on github: </p>
        <p className="about-paragraph">Built using React framework: <a className="about-link" href="https://facebook.github.io/react/">https://facebook.github.io/react/</a></p>
      </Page>
    );
  }
	
}

export default About;
