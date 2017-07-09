import React from 'react';
import { Cancel, Submit, NewButton } from '../form/Buttons';
import { TextInput } from '../form/Inputs';

const FormRow = props => {
	return (
		<div className="form-row">
			{ props.children }
		</div>
	);
};

const ButtonsFormRow = props => {
	return (
		<FormRow>
			<Cancel className="buttonIsActive" cancelEvent={ props.cancelEvent } />
			<Submit />
		</FormRow>
	);
};

const TextInputFormRow = props => {
	return (
		<FormRow>
			<label htmlFor={ props.name }>{ props.labelText }</label>
			<TextInput name={ props.name } { ...props } />
		</FormRow>
	);
};

const NewExcerptFormRow = props => {
	const optionListIsEmpty = props.optionList.length === 0;
	const newCategoryBtnClassName = props.newItemIsChosen ? 'buttonIsActive' : '';
	const optionListNames = props.optionList.map((option) => ((option.name || option.name === '') ? option.name : option ));

	return (
		<FormRow>
			<label htmlFor={props.inputName}>{props.label}</label>
			{
				props.newItemIsChosen || optionListIsEmpty
				? <TextInput name={props.inputName} placeholder={props.placeholder || ''} />
				: <select id={props.inputName} name={props.inputName} onChange={props.chooseItem}>
						{ optionListNames.map((option, i) => <option key={i} value={option}>{option}</option>) }
					</select>
			}

			<NewButton inputName={ props.inputName } btnClass={ newCategoryBtnClassName } onClick={ props.chooseNewItem } isActive={props.newBtnIsActive} />
		</FormRow>
	);
};

NewExcerptFormRow.defaultProps = {
	optionList: []
};


export { FormRow, ButtonsFormRow, TextInputFormRow, NewExcerptFormRow };