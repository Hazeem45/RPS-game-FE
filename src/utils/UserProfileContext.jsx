import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AlertMessage from '../components/fragments/AlertMessage';
import { DefaultPict } from '../assets/Image';
import { errorHandler } from './errorHandler';
import PropTypes from 'prop-types';

const UserProfileContext = createContext();
export const useProfile = () => useContext(UserProfileContext);

export function ProfileProvider({ children }) {
  const token = localStorage.getItem('accessToken');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButton, setAlertButton] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [visitedPicture, setVisitedPicture] = useState(null);
  const [userData, setUserData] = useState({
    username: null,
    firstname: null,
    lastname: null,
    address: null,
    gender: null,
    birthDate: null,
    infoBio: null,
    joinDate: null,
    pictureURL: null,
    email: null,
  });

  useEffect(() => {
    const fetchAPI = async() => {
      try {
        const responseAPIBiodata = await axios.get('https://rps-game-be.vercel.app/user/biodata', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { username, firstName, lastName, address, gender, birthDate, info, joinAt, profilePicture, email, newToken } = responseAPIBiodata.data;
        setUserData({
          username,
          firstname: firstName !== null ? firstName : username,
          lastname: lastName,
          address,
          gender: gender !== null ? gender : '',
          birthDate,
          infoBio: info,
          joinDate: joinAt,
          pictureURL: profilePicture || DefaultPict,
          email,
        });
        localStorage.setItem('accessToken', newToken);
      } catch (error) {
        setIsAlertVisible(true);
        setAlertTitle(errorHandler(error).alertTitle);
        setAlertMessage(errorHandler(error).alertMessage);
        setAlertButton(errorHandler(error).alertButton);
      }
    };
    if (window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      fetchAPI();
    }
  }, []);

  return (
    <UserProfileContext.Provider value={{ userData, setUserData, setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible, visitedPicture, setVisitedPicture }}>
      {isAlertVisible && (
        <AlertMessage
          title={alertTitle}
          handleButton={() => {
            if (alertButton === 'RELOG') {
              localStorage.removeItem('accessToken');
              location.reload();
            } else if (alertButton === 'RELOAD') {
              location.reload();
            } else if (alertButton === 'CLOSE') {
              setIsAlertVisible(false);
            }
          }}
          buttonText={alertButton}
        >
          {alertMessage}
        </AlertMessage>
      )}
      {children}
    </UserProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
