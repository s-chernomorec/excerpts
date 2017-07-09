import React from 'react';

const Icon = props => {
	return (
		<span className={`fa fa-${props.fa}`}></span>
	);
};

const IconWithText = props => {
	return (
		<span className="sidebar-item-text">
			<Icon fa={ props.fa } />
			{ props.text }
		</span>
	);
};

export { Icon, IconWithText };