import _ from 'lodash';
import React, { Component } from 'react';
import { render } from 'react-dom';

import Router from './components/Router'
import { reconcileCategories, reconcileExcerpts, mapToFalseValues } from './helpers';


class App extends Component {
  constructor(props) {
    super(props);

    this.excerptID = null;
		this.excerptDisplayStyles = [{ 
			key: 'tiles', 
			class: 'excerpts-display-tile'
		}, { 
			key: 'list', 
			class: 'excerpts-display-list'
		}];
		
    this.state = {};
    this.state.categoriesIsOpened = true;
		this.state.searchQuery = '';
    this.state.categories = [];
    this.state.excerpts = [];
		this.state.chosenCategory = null;
		this.state.excerptDisplayStyles = this.excerptDisplayStyles;
		this.state.activeExcerptDisplayStyle = this.excerptDisplayStyles[0];
    this.state.popups = {
      newExcerptIsOpen: false,
      newCategoryIsOpen: false,
      logInIsOpen: false,
      signUpIsOpen: false
    };
		
		
    this.addExcerpt = this.addExcerpt.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addTitle = this.addTitle.bind(this);
		this.chooseCategory = this.chooseCategory.bind(this);
    this.toggleCategories = this.toggleCategories.bind(this);
    this.toggleNewExcerpt = this.toggleNewExcerpt.bind(this);
    this.toggleNewCategory = this.toggleNewCategory.bind(this);
    this.closeAllPopups = this.closeAllPopups.bind(this);
		this.getSearchQuery = this.getSearchQuery.bind(this);
		this.removeExcerpt = this.removeExcerpt.bind(this);
		this.editExcerpt = this.editExcerpt.bind(this);
		this.addToFavourites = this.addToFavourites.bind(this);
		this.changeDisplayStyle = this.changeDisplayStyle.bind(this);
		this.fetchData = this.fetchData.bind(this);
  }
	
	componentDidMount() {
		this.fetchData();
	}
	
	fetchData() {
		fetch('/data.json')
      .then(response => response.json())
      .then(data => {
				this.setState({
					excerpts: data.excerpts.map((item) => _.assign(item, { date: new Date(item.date) })),
					categories: data.categories,
					chosenCategory: data.categories[0],
				});
				this.excerptID = data.excerpts[data.excerpts.length - 1].id;
			})
			.catch(e => console.log(e));
	}

  addExcerpt(newItem) {
    this.excerptID++;
    const excerpt = _.assign({}, newItem, {id: this.excerptID, favourite: false});
    this.setState((prevState) => ({ excerpts: [...prevState.excerpts, excerpt] }));
  }

  addCategory(catName, titleName) {
		const _titleName = titleName !== null ? [titleName] : [];
    const newCategory = {
      name: catName,
      titles: _titleName
    };
    this.setState((prevState) => ({ categories: [...prevState.categories, newCategory] }));
  }

  addTitle(catName, newTitleName) {
    const newCatList = this.state.categories.map((cat) => {
			return (catName === cat.name) ? _.assign({}, cat, { titles: [...cat.titles, newTitleName]}) : cat
		});
    this.setState({ categories: newCatList });
  }
	
	chooseCategory(chosenCategory) {
		if (chosenCategory) {
			this.setState({ chosenCategory: chosenCategory });
		}
  }
	
	chooseTitle(chosenCategory) {
		if (chosenCategory) {
			this.setState({ chosenCategory: chosenCategory });
		} else {
			this.setState({ chosenCategory: {name: 'Unsorted', titles: []} });
		}
  }

  toggleCategories() {
    this.setState((prevState) => ({ categoriesIsOpened: !prevState.categoriesIsOpened }));
  }

  toggleNewExcerpt() {
		const popups = mapToFalseValues(this.state.popups);
    this.setState((prevState) => ({ popups: _.assign({}, popups, { newExcerptIsOpen: !prevState.popups.newExcerptIsOpen }) }));
  }

  toggleNewCategory() {
    const popups = mapToFalseValues(this.state.popups);
    this.setState((prevState) => ({ popups: _.assign({}, popups, { newCategoryIsOpen: !prevState.popups.newCategoryIsOpen }) }));
  }
	
	closeAllPopups() {
		this.setState((prevState) => ({ popups: mapToFalseValues(this.state.popups) }));
	}
	
	getSearchQuery(query) {
		this.setState({ searchQuery: query });
	}
	
	removeExcerpt(excerpt) {
		const newCategories = reconcileCategories(excerpt, this.state.excerpts, this.state.categories);
		const newExcerpts = reconcileExcerpts(excerpt, this.state.excerpts);
		this.setState({ excerpts: newExcerpts, categories: newCategories, chosenCategory: newCategories[0] });
	}
	
	editExcerpt(excerpt) {
		const newExcerpt = _.assign({}, excerpt, { date: new Date() });
		const newExcerpts = this.state.excerpts.map((item) => item.id === newExcerpt.id ? newExcerpt : item);
		this.setState((prevState) => ({ excerpts: newExcerpts }));
	}
	
	addToFavourites(id) {
		const newExcerpt = _.find(this.state.excerpts, (item) => item.id === id);
		newExcerpt.favourite = !newExcerpt.favourite;
		const newExcerpts = this.state.excerpts.map((item) => item.id === newExcerpt.id ? newExcerpt : item);
		this.setState((prevState) => ({ excerpts: newExcerpts }));
	}
	
	changeDisplayStyle(style) {
		if (style) {
			this.setState({ activeExcerptDisplayStyle: style });
		}
	}

  render() {
		
    let props = {
			chooseCategory: (chosenCategory) => this.chooseCategory(chosenCategory),
      toggleCategories: this.toggleCategories,
      toggleNewExcerpt: this.toggleNewExcerpt,
      toggleNewCategory: this.toggleNewCategory,
			closeAllPopups: this.closeAllPopups,
      addExcerpt: (newItem) => this.addExcerpt(newItem),
      addCategory: (catName, titleName) => this.addCategory(catName, titleName),
      addTitle: (catName, newTitleName) =>this.addTitle(catName, newTitleName),
			getSearchQuery: (query) => this.getSearchQuery(query),
			removeExcerpt: (excerpt) => this.removeExcerpt(excerpt),
			editExcerpt: (excerpt) => this.editExcerpt(excerpt),
			changeDisplayStyle: (style) => this.changeDisplayStyle(style),
			addToFavourites: (id) => this.addToFavourites(id)
		};
		
		props = _.assign({}, props, this.state);

    return (
      <Router {...props} />
    );
  }
}


render (
  <App />,
  document.getElementById('app')
);
