import React from 'react';
import DisplayStyleBlock from '../common/DisplayStyleBlock';
import Pagination from '../common/Pagination';

const Frame = props => {
  return (
    <div className={props.cls || ''}>
      <div className={`frame ${props.frameType}`} style={props.frameStyle || {}}>
        <header className="frame-header">
          <h1>{props.headerTitle}</h1>
          <DisplayStyleBlock displayStyleIsActive={props.displayStyleIsActive} excerptDisplayStyles={props.excerptDisplayStyles} excerptDisplayStyleActive={props.excerptDisplayStyleActive} changeDisplayStyle={(style) => props.changeDisplayStyle(style)}/>
        </header>
        <div className="frame-content">
          {props.children}
        </div>

      </div>
    </div>
  );
};

const Page = props => {
  return (
    <Frame cls={`page-wrapper ${props.cls || ''}`} frameType="page" frameStyle={props.frameStyle} headerTitle={props.headerTitle} displayStyleIsActive={props.displayStyleIsActive} excerptDisplayStyles={props.excerptDisplayStyles} excerptDisplayStyleActive={props.excerptDisplayStyleActive} changeDisplayStyle={(style) => props.changeDisplayStyle(style)}>
      {props.children}
      {props.pagination === true
        ? <Pagination {...props}/>
        : ''}
    </Frame>
  );
};

const Popup = props => {
  return (
    <Frame frameType="popup" frameStyle={props.frameStyle} headerTitle={props.headerTitle}>
      {props.children}
    </Frame>
  );
};

export {Page, Popup}
