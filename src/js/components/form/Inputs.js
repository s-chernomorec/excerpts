import React from 'react';

const TextInput = props => {
  return (<input type="text" id={props.name || ''} name={props.name || ''} style={props.inputStyle || {}} className={props.className || ''} placeholder={props.placeholder || ''}/>);
}

export {TextInput}
