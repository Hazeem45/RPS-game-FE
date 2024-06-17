import React, { useEffect, useState } from 'react';
import './profileHistory.css';
import UserProfile from '../Sidebar/UserProfile';
import GameHistory from '../GameHistory';
import { useSidebar } from '../../../utils/SidebarContext';
import { DefaultPict } from '../../../assets/Image';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useProfile } from '../../../utils/UserProfileContext';
import { errorHandler } from '../../../utils/errorHandler';

function Index() {
  const token = localStorage.getItem('accessToken');
  const { setIsSidebarOpen, setOpenProfile, setOpenSearchBar, setOpenSetting, setIsHistoryOpen } = useSidebar();
  const { setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible, setVisitedPicture } = useProfile();
  const { username } = useParams();
  const [playerProfile, setPlayerProfile] = useState({
    username: null,
    firstname: null,
    lastname: null,
    pictureURL: null,
    info: null,
    address: null,
    gender: null,
    birthDate: null,
    joinAt: null,
    history: null,
  });

  const fetchAPIuserHistory = async() => {
    try {
      const responseAPI = await axios.get(`https://rps-game-be.vercel.app/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { firstName, lastName, profilePicture, info, address, gender, birthDate, joinAt, history } = responseAPI.data;
      setPlayerProfile({
        username: responseAPI.data.username,
        firstname: firstName,
        lastname: lastName,
        pictureURL: profilePicture || DefaultPict,
        info,
        address,
        gender,
        birthDate,
        joinAt,
        history,
      });
      setVisitedPicture(profilePicture);
    } catch (error) {
      setIsAlertVisible(true);
      setAlertTitle(errorHandler(error).alertTitle);
      setAlertMessage(errorHandler(error).alertMessage);
      setAlertButton(errorHandler(error).alertButton);
    }
  };

  useEffect(() => {
    fetchAPIuserHistory();
    setIsSidebarOpen(false);
    setOpenProfile(false);
    setOpenSetting(false);
    setIsHistoryOpen(false);
    setOpenSearchBar(false);
  }, []);

  return (
    <div className='profile-n-history-container'>
      <div className='profile-wrapper'>
        <div className='profile-float'>
          <UserProfile playerProfile={playerProfile} />
        </div>
      </div>
      <div className='history-wrapper'>
        <GameHistory gameHistory={playerProfile.history} username={playerProfile.username} />
      </div>
    </div>
  );
}

export default Index;
