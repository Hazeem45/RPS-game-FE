import React, {useEffect, useState} from "react";
import RoomDetail from "../components/templates/RoomDetail";
import {gameRules} from "../utils/validation";

function GameVersusPlayer() {
  const [roomName, setRoomName] = useState("");
  const [player1Name, setPlayer1Name] = useState("d.destroyer");
  const [player2Name, setPlayer2Name] = useState("Waiting...");
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [result, setResult] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [onHover, setOnHover] = useState("");
  const [isChoiceDecided, setIsChoiceDecided] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupValue, setPopupValue] = useState("");

  useEffect(() => {
    const resultGame = gameRules(player1Choice, player2Choice);
    setResult(resultGame);
  }, [player1Choice, player2Choice]);

  // temporary player 1 choose, will be fix soon when implementation fetch api
  const randomChoiceCom = () => {
    const availableChoice = ["rock", "paper", "scissors"];
    const randomInt = Math.floor(Math.random() * 3);
    const getChoice = availableChoice[randomInt];
    setPlayer1Choice(getChoice);
  };

  // player choose handling
  const handleClick = (e) => {
    if (isChoiceDecided) {
      setPopupValue("a Room Can Only be Played Once! Please Find Another Room");
      setPopupVisible(true);
    } else {
      setPlayer2Choice(e.target.alt);
      setIsChoiceDecided(true);
      setPlayer2Name("PLAYER 2");
      randomChoiceCom();
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
      title={`${roomName} Room`}
      rockSelectedP1={player1Choice === "rock" ? "clicked" : ""}
      rockSelectedP2={player2Choice === "rock" ? "clicked" : ""}
      paperSelectedP1={player1Choice === "paper" ? "clicked" : ""}
      paperSelectedP2={player2Choice === "paper" ? "clicked" : ""}
      scissorsSelectedP1={player1Choice === "scissors" ? "clicked" : ""}
      scissorsSelectedP2={player2Choice === "scissors" ? "clicked" : ""}
      player1={player1Name}
      player2={player2Name}
      gameType={"vs-player"}
      styleRock={handleStyleRock()}
      stylePaper={handleStylePaper()}
      styleScissors={handleStyleScissors()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      result={result}
      popupVisible={popupVisible}
      popupValue={popupValue}
      handleClosePopup={() => setPopupVisible(false)}
    />
  );
}

export default GameVersusPlayer;
