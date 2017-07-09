import React from 'react';

const Validation = props => {
	return (
		props.condition === true
			? <div className="validation-block" style={props.validationStyle || {}}>
					{ props.messages.map((msg, i) => <span key={i} className="validation-message">{msg}</span>) }
				</div>
			: null
	);
}

export default Validation;