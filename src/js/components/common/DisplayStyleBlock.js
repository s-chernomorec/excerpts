import _ from 'lodash';
import React from 'react';

const DisplayStyleButton = props => {
	
	const chooseStyle = () => {
		const style = _.find(props.excerptDisplayStyles, (item) => item.key === props.thisStyle);
		props.changeDisplayStyle(style);
	}
	
	const activeClass = props.activeStyle === props.thisStyle ? 'display-excerpts-btn-active' : '';
	return <span className={`display-excerpts-btn ${activeClass}`} onClick={chooseStyle}>{props.thisStyle}</span>;
}

const DisplayStyleBlock = props => {
	return props.displayStyleIsActive === true
		? <div className="excerpts-display-style-wrapper">
				<span className="display-excerpts-as">Display as</span>
				<span className="display-excerpts-block">
					{ props.excerptDisplayStyles.map((item, i) => {
						return (<DisplayStyleButton key={i} 
							activeStyle={props.excerptDisplayStyleActive.key} 
							thisStyle={item.key} 
							changeDisplayStyle={(style) => props.changeDisplayStyle(style)} 
							excerptDisplayStyles={props.excerptDisplayStyles}
						/> );
					}) }
				</span>
			</div>
		: null
}

export default DisplayStyleBlock;