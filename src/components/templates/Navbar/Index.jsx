import React from 'react';
import './navbar.css';
import TitleIcon from '../../../components/fragments/TitleIcon';
import ProfileNav from './ProfileNav';
import { useProfile } from '../../../utils/UserProfileContext';
import PropTypes from 'prop-types';

function Index({ handleClickIconGame, handleClickIconProfile }) {
  const { userData } = useProfile();

  return (
    <div className='navbar unselectable'>
      <TitleIcon handleClick={handleClickIconGame} />
      <ProfileNav username={userData.username} handleClick={handleClickIconProfile} userPict={userData.pictureURL} />
    </div>
  );
}

Index.propTypes = {
  handleClickIconGame: PropTypes.func.isRequired,
  handleClickIconProfile: PropTypes.func.isRequired,
};

export default Index;
