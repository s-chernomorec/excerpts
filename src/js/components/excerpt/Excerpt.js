import _ from 'lodash';
import React, {Component} from 'react';
import {validateField, validate} from '../../helpers';
import Validation from '../other/Validation';
import Textarea from '../form/Textarea';
import ExcerptTitle from './ExcerptTitle';
import ManageExcerpt from './ManageExcerpt';
import DateBlock from './DateBlock';

export class Excerpt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseOverExcerpt: false,
      editIsActive: false,
      validationIsPassed: true,
      validationMessages: null
    }

    this.showManageButtons = this.showManageButtons.bind(this);
    this.hideManageButtons = this.hideManageButtons.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.acceptEdit = this.acceptEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  showManageButtons(e) {
    this.setState({mouseOverExcerpt: true});
  }

  hideManageButtons(e) {
    this.setState({mouseOverExcerpt: false});
  }

  remove() {
    this.props.removeExcerpt(this.props.excerpt);
  }

  edit() {
    this.setState({editIsActive: true});
  }

  acceptEdit() {

    const prevText = this._textarea.props.text;
    const nextText = this._textarea._textarea.value;

    if (prevText !== nextText) {
      const validationResults = validate([validateField(nextText, {
          min: 3,
          max: 800,
          name: 'Excerpt text'
        })]);

      this.setState(validationResults);

      if (validationResults.validationIsPassed === false)
        return;

      const editedExcerpt = _.assign({}, this.props.excerpt, {text: nextText});
      this.props.editExcerpt(editedExcerpt);

      this.setState({editIsActive: false});
    } else {
      this.setState({editIsActive: false});
    }
  }

  cancelEdit() {
    this.setState({editIsActive: false});
  }

  render() {
    const manageExcerptStyle = {
      display: this.state.mouseOverExcerpt
        ? 'block'
        : 'none'
    };
    const classWhenFavourite = this.props.excerpt.favourite
      ? 'excerpt-is-favourite'
      : '';

    return (
      <div className="excerpt-wrapper">
        <ExcerptTitle titleIsProvided={this.props.titleIsProvided} title={this.props.excerpt.title} category={this.props.excerpt.category}/>
        <div className={`excerpt-body ${classWhenFavourite}`} onMouseEnter={this.showManageButtons} onMouseLeave={this.hideManageButtons}>
          <DateBlock date={this.props.excerpt.date}/>
          <Validation condition={!this.state.validationIsPassed && this.state.editIsActive} messages={this.state.validationMessages} validationStyle={{
            margin: '0 0 10px 0'
          }}/> {this.state.editIsActive
            ? <Textarea text={this.props.text} ref={(input) => {
                this._textarea = input;
              }}/>
            : <span className="excerpt-text" onClick={this.edit}>{this.props.text}</span>
}
          <ManageExcerpt manageIsActive={this.state.editIsActive} excerptID={this.props.excerpt.id} favouriteCls={this.props.excerpt.favourite
            ? 'heart'
            : 'heart-o'} acceptEdit={this.acceptEdit} cancelEdit={this.cancelEdit} edit={this.edit} remove={this.remove} addToFavourites={(id) => this.props.addToFavourites(id)} manageExcerptStyle={manageExcerptStyle}/>
        </div>
      </div>
    );
  }
};
