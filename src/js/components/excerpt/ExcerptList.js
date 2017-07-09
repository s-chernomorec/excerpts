import React, {Component} from 'react';
import { Excerpt } from './Excerpt';

export class ExcerptList extends Component {
	render() {
		const activeDisplayStyle = this.props.activeExcerptDisplayClass
		
		return (
			<div className={`excerpt-list-wrapper ${activeDisplayStyle || 'excerpts-display-list'}`}>
				{ 
					this.props.excerpts.map((excerpt, i) => {
						return (
							<Excerpt
								key={excerpt.id}
								titleIsProvided={this.props.titleIsProvided[i]}
								excerpt={excerpt}
								removeExcerpt={ (excerpt) => this.props.removeExcerpt(excerpt) }
								editExcerpt={ (excerpt) => this.props.editExcerpt(excerpt) }
								addToFavourites={ (id) => this.props.addToFavourites(id) }
								text={excerpt.text}
							/>
						);
					}) 
				}
			</div>
		);
	}
};

export default ExcerptList;