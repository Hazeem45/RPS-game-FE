import React from 'react';
import './styles/failMessage.css';
import PropTypes from 'prop-types';

function FailMessage({ children }) {
  return <div className='fail-message'>{children}</div>;
}

FailMessage.propTypes = {
  children: PropTypes.string,
};

export default FailMessage;
