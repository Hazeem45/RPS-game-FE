import React from 'react';
import PropTypes from 'prop-types';

function Textarea({ style, handleChange, maxLength, id, value }) {
  return <textarea style={style} onChange={handleChange} maxLength={maxLength} id={id} value={value}></textarea>;
}

Textarea.propTypes = {
  style: PropTypes.object,
  handleChange: PropTypes.func,
  maxLength: PropTypes.number,
  id: PropTypes.string,
  value: PropTypes.string,
};

export default Textarea;
