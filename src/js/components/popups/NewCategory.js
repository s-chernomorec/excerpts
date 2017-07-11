import React, {Component} from 'react';
import {Popup} from '../common/Frames';
import {TextInputFormRow, ButtonsFormRow} from '../form/FormRow';
import {validateField, validate, checkForUniqueness} from '../../helpers';
import Validation from '../other/Validation';

class NewCategory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      validationIsPassed: true,
      validationMessages: null
    }

    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const newCategoryName = e.target.newCategoryName.value;

    const validationResults = validate([
      validateField(newCategoryName, {
        min: 3,
        max: 12,
        name: 'Category name'
      }),
      checkForUniqueness(newCategoryName, this.props.categories, 'name')
        ? null
        : 'Category name should be unique'
    ]);

    this.setState(validationResults);

    if (validationResults.validationIsPassed === false)
      return;

    this.props.addCategory(newCategoryName);
    e.target.reset();
  }

  render() {
    let displayPopup = {
      display: this.props.newCategoryIsOpen
        ? 'block'
        : 'none'
    };

    return (
      <Popup headerTitle="New Category" frameStyle={displayPopup}>
        <form onSubmit={this.submit}>

          <Validation condition={!this.state.validationIsPassed} messages={this.state.validationMessages}/>

          <TextInputFormRow name="newCategoryName" labelText="Category" placeholder="3-12 characters" inputStyle={{
            marginRight: 0
          }}/>

          <ButtonsFormRow cancelEvent={this.props.toggleNewCategory}/>

        </form>
      </Popup>
    );
  }

}

export default NewCategory;
