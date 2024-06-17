import React from 'react';
import './styles/successMessage.css';
import PropTypes from 'prop-types';

function SuccessMessage({ children }) {
  return <div className='success-message'>{children}</div>;
}

SuccessMessage.propTypes = {
  children: PropTypes.string,
};

export default SuccessMessage;
