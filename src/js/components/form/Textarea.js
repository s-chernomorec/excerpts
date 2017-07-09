import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Textarea extends Component {
	constructor(props) {
		super(props);
		
		this.autoHeight = this.autoHeight.bind(this);
	}
	
	componentDidMount() {
		this._textarea.focus();
	}
	
	autoHeight(e) {
		if (e.target !== null) {
			e.target.style.height = '100%';
			e.target.style.height = e.target.scrollHeight + "px";
		} 
	}
	
	render() {
		return (
			<textarea 
				className="excerpt-edit-textarea" 
				defaultValue={this.props.text} 
				ref={(input) => { this._textarea = input; }}  
				onChange={this.autoHeight}
				onFocus={this.autoHeight}
			/>
		);
	}
}
