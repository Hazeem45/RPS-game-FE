import React from 'react';
import './styles/inputForm.css';
import Label from '../elements/Label';
import Input from '../elements/Input';
import ErrorMessage from '../elements/ErrorMessage';
import PropTypes from 'prop-types';

function InputForm({ value, name, label, type, placeholder, handleChange, errorMessage, pattern, required, styleLabel }) {
  return (
    <div className='input-form'>
      <Label styleLabel={styleLabel} name={name} value={label} labelClass={name} />
      <Input type={type} placeholder={placeholder} name={name} handleChange={handleChange} pattern={pattern} required={required} value={value} />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

InputForm.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  errorMessage: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  styleLabel: PropTypes.object,
};

export default InputForm;
