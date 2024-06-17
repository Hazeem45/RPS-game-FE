import React from 'react';
import './styles/popup.css';
import PropTypes from 'prop-types';

function Popup({ children, handleClose }) {
  return (
    <div className='popup'>
      <h3>Message :</h3>
      <div>{children}</div>
      <button className='close' onClick={handleClose}>
        X
      </button>
    </div>
  );
}

Popup.propTypes = {
  children: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
