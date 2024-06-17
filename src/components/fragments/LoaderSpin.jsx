import React from 'react';
import './styles/loader.css';
import PropTypes from 'prop-types';

function LoaderSpin({ customLoader }) {
  return (
    <div className='box-loader-circle'>
      <div className='loader' style={customLoader}></div>
    </div>
  );
}

LoaderSpin.propTypes = {
  customLoader: PropTypes.object,
};

export default LoaderSpin;
