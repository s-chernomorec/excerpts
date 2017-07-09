import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Popup } from '../common/Frames';
import { Submit } from '../form/Buttons';
import { FormRow, NewExcerptFormRow, ButtonsFormRow } from '../form/FormRow';
import { validateField, validate, checkForUniqueness } from '../../helpers';
import Validation from '../other/Validation';


class NewExcerpt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategoryIsChosen: false,
      newTitleIsChosen: false,
			validationIsPassed: true,
			validationMessages: null
    }

    this.chooseNewCategory = this.chooseNewCategory.bind(this);
    this.chooseNewTitle = this.chooseNewTitle.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.submit = this.submit.bind(this);
  }
	
  chooseNewCategory(e) {
		if (e) e.preventDefault();
    const newCategoryIsChosen = !this.state.newCategoryIsChosen;
    this.setState({
      newCategoryIsChosen: newCategoryIsChosen,
      newTitleIsChosen: newCategoryIsChosen ? true : false
    });
  }

  chooseNewTitle(e) {
		if (e) e.preventDefault();
    this.setState((prevState) => ({ newTitleIsChosen: !prevState.newTitleIsChosen }));
  }

  chooseCategory(obj) {
    let chosenCategory;
		let chooseOrUpdateValue;
		
		if (obj) {
			if (obj.target) chooseOrUpdateValue = obj.target.value;
			if (obj.name) chooseOrUpdateValue = obj.name;
		}
		
    this.props.categories.forEach((cat) => {
      if (cat.name === chooseOrUpdateValue) chosenCategory = cat;
    });
    this.props.chooseCategory(chosenCategory);
  }

  submit(e) {
    e.preventDefault();
    const category = e.target.categoryName.value;
		const title = e.target.titleName.value;
		const text = e.target.excerptText.value;
		
		const validationResults = validate([
			!checkForUniqueness(category, this.props.categories, 'name') && this.state.newCategoryIsChosen ? 'Category name should be unique' : null,
			!checkForUniqueness(title, this.props.chosenCategory.titles) && this.state.newTitleIsChosen ? 'Title should be unique in same category' : null,
			validateField(category, {min: 3, max: 12, name: 'Category name'}),
			validateField(title, {min: 3, max: 24, name: 'Title name'}),
			validateField(text, {min: 3, max: 800, name: 'Excerpt text'})
		]);
		
		this.setState(validationResults);
		
		if (validationResults.validationIsPassed === false) return;
		
		const newExcerpt = {
      date: new Date(),
      category: category,
      title: title,
      text: text
    };
		
		
		if (this.props.categories.length === 0) {
			this.props.addCategory(category, title);
      this.setState({ newCategoryIsChosen: false, newTitleIsChosen: false }, () => { this.chooseCategory({ name: category, titles: [title] }) });
		} else if ((this.state.newCategoryIsChosen && this.state.newTitleIsChosen)) {
      this.props.addCategory(category, title);
      this.setState({ newCategoryIsChosen: false, newTitleIsChosen: false }, () => { this.chooseCategory(this.props.categories[0]) });
    } else if (this.state.newTitleIsChosen) {
      this.props.addTitle(category, title);
      this.setState({ newTitleIsChosen: false }, () => { this.chooseCategory(this.props.categories[0]) });
    } else {
			this.chooseCategory(this.props.categories[0]);
		}

    this.props.addExcerpt(newExcerpt);
		
    e.target.reset();
  }


  render() {
    let displayPopup = { display: this.props.newExcerptIsOpen ? 'block' : 'none' };
		
    return (
      <Popup headerTitle="New Excerpt" frameStyle={displayPopup}>
        <form onSubmit={this.submit}>
        	
         	<Validation condition={!this.state.validationIsPassed} messages={this.state.validationMessages} />
         	
          <NewExcerptFormRow
            label="Category"
            inputName="categoryName"
            placeholder="3-12 characters"
            optionList={this.props.categories}
            newItemIsChosen={this.state.newCategoryIsChosen}
            chooseItem={ (e) => this.chooseCategory(e) }
            chooseNewItem={ (e) => this.chooseNewCategory(e) }
          />

          <NewExcerptFormRow
            label="Title"
            inputName="titleName"
            placeholder="3-24 characters"
            optionList={this.props.chosenCategory.titles}
            newItemIsChosen={this.state.newTitleIsChosen}
            chooseItem={ (e) => true }
            chooseNewItem={ (e) => this.chooseNewTitle(e) }
            newBtnIsActive={!this.state.newCategoryIsChosen}
          />

          <FormRow>
            <textarea name="excerptText" id="excerptText" cols="40" rows="5" placeholder="3-800 characters"></textarea>
          </FormRow>

          <ButtonsFormRow cancelEvent={ this.props.toggleNewExcerpt } />

        </form>
      </Popup>
    );
  }
}

export default NewExcerpt;
