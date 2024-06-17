import React from 'react';
import PropTypes from 'prop-types';

function Select({ name, options, handleChange }) {
  return (
    <select id={name} name={name} onChange={handleChange}>
      {options.map((options) => {
        return (
          <option key={options} value={options}>
            {options}
          </option>
        );
      })}
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Select;
