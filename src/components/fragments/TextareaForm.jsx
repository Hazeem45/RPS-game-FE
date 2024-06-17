import React from 'react';
import './styles/textareaForm.css';
import Label from '../elements/Label';
import Textarea from '../elements/Textarea';
import PropTypes from 'prop-types';

function TextareaForm({ value, style, name, label, handleChange, textLength, maxLength }) {
  return (
    <div className='textarea-form'>
      <Label name={name} value={label} labelClass={name} />
      <Textarea style={style} handleChange={handleChange} maxLength={maxLength} id={name} value={value}></Textarea>
      <p>
        {textLength || 0}/{maxLength}
      </p>
    </div>
  );
}

TextareaForm.propTypes = {
  value: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  textLength: PropTypes.number,
  maxLength: PropTypes.number,
};

export default TextareaForm;
