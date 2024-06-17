import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage({ errorMessage }) {
  return <span className='error-message'>{errorMessage}</span>;
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorMessage;
