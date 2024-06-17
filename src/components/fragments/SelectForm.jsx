import React from 'react';
import './styles/selectForm.css';
import Label from '../elements/Label';
import Select from '../elements/Select';
import PropTypes from 'prop-types';

function SelectForm({ name, options, handleChange, label }) {
  return (
    <div className='select-form'>
      <Label name={name} value={label} />
      <Select name={name} id={name} options={options} handleChange={handleChange} />
    </div>
  );
}

SelectForm.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default SelectForm;
