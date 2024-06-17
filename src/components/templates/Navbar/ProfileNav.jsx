import React from 'react';
import './profileNav.css';
import ProfileIcon from '../../fragments/ProfileIcon';
import { useSidebar } from '../../../utils/SidebarContext';
import PropTypes from 'prop-types';

function ProfileNav({ username, userPict, handleClick }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className='profile-nav'>
      <h3>{username || 'Loading...'}</h3>
      <div className='icon' style={{ boxShadow: isSidebarOpen ? '0 0 0px 1.5px black' : '' }}>
        <ProfileIcon classImg='center-img' handleClick={handleClick} userPict={userPict} />
      </div>
    </div>
  );
}

ProfileNav.propTypes = {
  username: PropTypes.string,
  userPict: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ProfileNav;
