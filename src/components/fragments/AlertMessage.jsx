import React from 'react';
import './styles/alertMessage.css';
import Image from '../elements/Image';
import { WarningIcon } from '../../assets/Image';
import Button from '../elements/Button';
import PropTypes from 'prop-types';

function AlertMessage({ handleButton, buttonText, title, children }) {
  return (
    <div className='alert-message'>
      <div className='alert-box'>
        <div className='title'>
          <Image src={WarningIcon} />
          <h3>{title}</h3>
        </div>
        <div className='message-content'>
          <p>{children}</p>
        </div>
        <div className='alert-button'>
          <Button handleClick={handleButton}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
}

AlertMessage.propTypes = {
  handleButton: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default AlertMessage;
