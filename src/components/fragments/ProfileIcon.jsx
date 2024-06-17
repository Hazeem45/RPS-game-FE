import React from 'react';
import './styles/profileIcon.css';
import Image from '../elements/Image';
import LoaderSpin from './LoaderSpin';
import PropTypes from 'prop-types';

function ProfileIcon({ userPict, handleClick, classImg }) {
  return (
    <div className='profile-icon' onClick={handleClick}>
      {userPict
        ? (
        <Image classImg={classImg} src={userPict} />
          )
        : (
        <div style={{ background: 'lightgrey', width: '100%', height: '100%', padding: '3px', boxSizing: 'border-box' }}>
          <LoaderSpin customLoader={{ border: '4px solid black' }} />
        </div>
          )}
    </div>
  );
}

ProfileIcon.propTypes = {
  userPict: PropTypes.string,
  handleClick: PropTypes.func,
  classImg: PropTypes.string,
};

export default ProfileIcon;
