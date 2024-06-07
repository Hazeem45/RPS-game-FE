import React, {useEffect, useState} from "react";
import RoomDetail from "../components/templates/RoomDetail";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useProfile} from "../utils/UserProfileContext";
import {errorHandler} from "../utils/errorHandler";

function GameVersusPlayer() {
  const {roomId} = useParams();
  const token = localStorage.getItem("accessToken");
  const {userData, setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible} = useProfile();
  const [roomDetails, setRoomDetails] = useState({
    roomName: null,
    player1Name: null,
    player2Name: null,
    player1Choice: null,
    player2Choice: null,
    gameResult: null,
  });
  const [isHover, setIsHover] = useState(false);
  const [onHover, setOnHover] = useState("");
  const [isChoiceDecided, setIsChoiceDecided] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupValue, setPopupValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAPIroomDetail = async () => {
      setIsLoading(true);
      try {
        const responseAPI = await axios.get(`https://rps-game-be.vercel.app/game/room/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {roomName, player1, player2, player1Choice, player2Choice, gameResult} = responseAPI.data;
        setRoomDetails({
          roomName,
          player1Name: player1,
          player2Name: player2 ? player2 : "Waiting...",
          player1Choice: player1Choice.toLowerCase(),
          player2Choice: player2Choice ? player2Choice.toLowerCase() : null,
          gameResult,
        });
        if (player2Choice) {
          setIsChoiceDecided(true);
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertTitle(errorHandler(error).alertTitle);
        setAlertMessage(errorHandler(error).alertMessage);
        setAlertButton(errorHandler(error).alertButton);
      }
      setIsLoading(false);
    };
    fetchAPIroomDetail();
  }, []);

  // player 2 choose
  const handleClick = async (e) => {
    if (isChoiceDecided) {
      setPopupValue("a Room Can Only be Played Once! Please Find Another Room");
      setPopupVisible(true);
    } else {
      setPopupVisible(false);
      if (e.target.alt) {
        setRoomDetails({...roomDetails, player2Choice: e.target.alt});
        setIsLoading(true);
        try {
          const responseAPI = await axios.put(
            `https://rps-game-be.vercel.app/game/room/${roomId}`,
            {player2Choice: e.target.alt},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const {player1Choice, yourChoice, gameResult} = responseAPI.data;
          setRoomDetails({
            ...roomDetails,
            player1Choice: player1Choice.toLowerCase(),
            player2Choice: yourChoice.toLowerCase(),
            player2Name: userData.username,
          });
          setIsChoiceDecided(true);
        } catch (error) {
          if (error.response.status === 403) {
            setPopupValue(error.response.data.message);
            setRoomDetails({...roomDetails, player2Choice: null});
            setPopupVisible(true);
          } else {
            setIsAlertVisible(true);
            setAlertTitle(errorHandler(error).alertTitle);
            setAlertMessage(errorHandler(error).alertMessage);
            setAlertButton(errorHandler(error).alertButton);
          }
        }
        setIsLoading(false);
      }
    }
  };

  // hover event listener
  const handleMouseEnter = (e) => {
    setOnHover(e.target.id);
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // style box when hover
  const hoverStyle = {
    transform: isHover ? "scale(1.15)" : "",
    filter: isHover ? "drop-shadow(0 0 13px orange)" : "",
    cursor: "pointer",
  };

  const handleStyleRock = () => {
    if (!isChoiceDecided) {
      if (onHover === "rock") {
        return hoverStyle;
      }
    }
  };

  const handleStylePaper = () => {
    if (!isChoiceDecided) {
      if (onHover === "paper") {
        return hoverStyle;
      }
    }
  };

  const handleStyleScissors = () => {
    if (!isChoiceDecided) {
      if (onHover === "scissors") {
        return hoverStyle;
      }
    }
  };

  return (
    <RoomDetail
      title={roomDetails.roomName}
      rockSelectedP1={roomDetails.player1Choice === "rock" ? "clicked" : ""}
      rockSelectedP2={roomDetails.player2Choice === "rock" ? "clicked" : ""}
      paperSelectedP1={roomDetails.player1Choice === "paper" ? "clicked" : ""}
      paperSelectedP2={roomDetails.player2Choice === "paper" ? "clicked" : ""}
      scissorsSelectedP1={roomDetails.player1Choice === "scissors" ? "clicked" : ""}
      scissorsSelectedP2={roomDetails.player2Choice === "scissors" ? "clicked" : ""}
      player1={roomDetails.player1Name}
      player2={roomDetails.player2Name}
      gameType={"vs-player"}
      styleRock={handleStyleRock()}
      stylePaper={handleStylePaper()}
      styleScissors={handleStyleScissors()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      result={roomDetails.gameResult}
      popupVisible={popupVisible}
      popupValue={popupValue}
      handleClosePopup={() => setPopupVisible(false)}
      loading={isLoading}
    />
  );
}

export default GameVersusPlayer;
