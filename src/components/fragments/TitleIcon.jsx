import React from 'react';
import './styles/titleIcon.css';
import Image from '../elements/Image';
import { RpsIcon } from '../../assets/Image';
import PropTypes from 'prop-types';

function TitleIcon({ iconStyleCustom, handleClick }) {
  return (
    <div className='title-icon unselectable' style={iconStyleCustom} onClick={handleClick}>
      <div className='image'>
        <Image src={RpsIcon} />
      </div>
      <h2>RPS Game</h2>
    </div>
  );
}

TitleIcon.propTypes = {
  iconStyleCustom: PropTypes.object,
  handleClick: PropTypes.func,
};

export default TitleIcon;
