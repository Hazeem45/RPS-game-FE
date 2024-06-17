import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Input({ type, name, placeholder, handleChange, pattern, required, fileRef, accept, value, disabled, maxLength }) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      id={name}
      onChange={handleChange}
      className='input'
      pattern={pattern}
      required={required}
      ref={fileRef}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      data-focused={focused.toString()}
      value={value}
      accept={accept}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  fileRef: PropTypes.object,
  value: PropTypes.string,
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default Input;
