import React from 'react';

const ExcerptTitle = props => {
	return (
		props.titleIsProvided === true 
			? <header className="excerpt-header"><h2 className="excerpt-title">{props.title}</h2><h3 className="excerpt-category">{props.category}</h3></header> 
			: null
	);
}

export default ExcerptTitle;