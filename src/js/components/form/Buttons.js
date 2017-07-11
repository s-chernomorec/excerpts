import _ from 'lodash';
import React from 'react';

const Submit = props => {
  return (<input type="submit" className={props.className || ''} value="Submit"/>);
};

const Cancel = props => {
  return (<input type="button" value="Cancel" className={props.className || ''} onClick={props.cancelEvent}/>);
};

const NewButton = props => {
  const btnStyle = _.assign({}, props.btnStyle || {}, {
    display: props.isActive === false
      ? 'none'
      : 'block'
  });
  return (<input type="button" id={props.inputName + "New"} name={props.inputName + "New"} value="New" style={btnStyle} className={props.btnClass || ''} onClick={props.onClick}/>);
};

export {Submit, Cancel, NewButton};
