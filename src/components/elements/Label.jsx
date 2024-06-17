import React from 'react';
import PropTypes from 'prop-types';

function Label({ name, value, labelClass, styleLabel }) {
  return (
    <label style={styleLabel} className={labelClass} htmlFor={name}>
      {value}
    </label>
  );
}

Label.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  labelClass: PropTypes.string,
  styleLabel: PropTypes.object,
};

export default Label;
