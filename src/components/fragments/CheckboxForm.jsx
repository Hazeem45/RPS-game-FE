import React from 'react';
import './styles/checkboxForm.css';
import Input from '../elements/Input';
import Label from '../elements/Label';
import PropTypes from 'prop-types';

function CheckboxForm({ styleCustom, handleChange, value, name }) {
  return (
    <div style={styleCustom} className='input-checkbox'>
      <Input type='checkbox' handleChange={handleChange} name={name} />
      <Label labelClass='checkbox' name={name} value={value} />
    </div>
  );
}

CheckboxForm.propTypes = {
  styleCustom: PropTypes.object,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
};

export default CheckboxForm;
