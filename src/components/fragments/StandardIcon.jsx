import React from 'react';
import './styles/standardIcon.css';
import Image from '../elements/Image';
import PropTypes from 'prop-types';

function StandardIcon({ icon }) {
  return (
    <div className='standard-icon'>
      <Image src={icon} />
    </div>
  );
}

StandardIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default StandardIcon;
