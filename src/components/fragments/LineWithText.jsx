import React from 'react';
import './styles/lineWithText.css';
import PropTypes from 'prop-types';

function LineWithText({ value }) {
  return (
    <div className='line-with-text'>
      <span>{value}</span>
    </div>
  );
}

LineWithText.propTypes = {
  value: PropTypes.string.isRequired,
};

export default LineWithText;
