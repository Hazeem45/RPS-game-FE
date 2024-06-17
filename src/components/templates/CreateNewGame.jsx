import React, { useState } from 'react';
import './styles/createNewGame.css';
import ListOfChoices from '../fragments/ListOfChoices';
import Button from '../elements/Button';
import InputForm from '../fragments/InputForm';
import { validationRoomName } from '../../utils/validation';
import Popup from '../fragments/Popup';
import { useNavigate } from 'react-router-dom';
import TitlePage from '../fragments/TitlePage';
import axios from 'axios';
import { useProfile } from '../../utils/UserProfileContext';
import { errorHandler } from '../../utils/errorHandler';

function NewGame() {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible } = useProfile();
  const [roomName, setRoomName] = useState('');
  const [choice, setChoice] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupValue, setPopupValue] = useState('');

  const handleSubmit = async() => {
    if (roomName === '' && (choice === '' || choice === undefined)) {
      setPopupValue('Must Give the Room a Name and Select the Available Options!');
      setPopupVisible(true);
    } else if (roomName === '' || choice === '' || choice === undefined) {
      if (roomName === '') {
        setPopupValue('You Must Name the Room to Continue!');
      } else if (choice === '' || choice === undefined) {
        setPopupValue('You Must Choose to Continue!');
      }
      setPopupVisible(true);
    } else {
      const nameLength = roomName.length;
      if (nameLength < 5 || nameLength > 10) {
        setPopupValue('Room Name must be at least 5 characters and max 10 Characters!');
        setPopupVisible(true);
      } else {
        try {
          const responseAPI = await axios.post(
            'https://rps-game-be.vercel.app/game/new-room',
            {
              roomName,
              player1Choice: choice,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const { roomId, message } = responseAPI.data;
          alert(message);
          navigate(`/versus-player/${roomId}`);
        } catch (error) {
          if (error.response.status === 409) {
            setPopupValue(error.response.data.message);
            setPopupVisible(true);
          } else {
            setIsAlertVisible(true);
            setAlertTitle(errorHandler(error).alertTitle);
            setAlertMessage(errorHandler(error).alertMessage);
            setAlertButton(errorHandler(error).alertButton);
          }
        }
      }
    }
  };

  const cursorStyle = { cursor: 'pointer' };

  return (
    <div className='new-game unselectable'>
      <TitlePage>Create Room</TitlePage>
      <div style={{ width: '300px' }}>
        <InputForm
          type='text'
          placeholder='Enter The Room Name'
          pattern={'^.{5,10}$'}
          errorMessage={validationRoomName(roomName)}
          required
          handleChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
      </div>
      <ListOfChoices
        classForRock={choice === 'rock' ? 'clicked' : ''}
        classForPaper={choice === 'paper' ? 'clicked' : ''}
        classForScissors={choice === 'scissors' ? 'clicked' : ''}
        styleRock={cursorStyle}
        stylePaper={cursorStyle}
        styleScissors={cursorStyle}
        onClick={(e) => {
          setChoice(e.target.alt);
        }}
      />
      <div style={{ width: '200px' }}>
        <Button handleClick={handleSubmit}>Create</Button>
      </div>
      {popupVisible && <Popup handleClose={() => setPopupVisible(false)}>{popupValue}</Popup>}
    </div>
  );
}

export default NewGame;
