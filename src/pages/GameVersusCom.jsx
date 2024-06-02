import React, {useEffect, useState} from "react";
import RoomDetail from "../components/templates/RoomDetail";
import {gameRules} from "../utils/validation";

function GameVersusCom() {
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [result, setResult] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [onHover, setOnHover] = useState("");
  const [isChoiceDecided, setIsChoiceDecided] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupValue, setPopupValue] = useState("");

  useEffect(() => {
    const resultGame = gameRules(player1Choice, player2Choice);
    setResult(resultGame);
  }, [player1Choice, player2Choice]);

  // com choose
  const randomChoiceCom = () => {
    const availableChoice = ["rock", "paper", "scissors"];
    const randomInt = Math.floor(Math.random() * 3);
    const getChoice = availableChoice[randomInt];
    setPlayer2Choice(getChoice);
  };

  // player choose handling
  const handleClick = (e) => {
    if (isChoiceDecided) {
      setPopupValue("Click Refresh Button to Start a New Games");
      setPopupVisible(true);
    } else {
      setPlayer1Choice(e.target.alt);
      setIsChoiceDecided(true);
      randomChoiceCom();
    }
  };

  // refresh handling
  const handleRefresh = () => {
    setIsChoiceDecided(false);
    setPlayer1Choice("");
    setPlayer2Choice("");
    setResult("");
    setPopupVisible(false);
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
      title="VS COM [demo]"
      rockSelectedP1={player1Choice === "rock" ? "clicked" : ""}
      rockSelectedP2={player2Choice === "rock" ? "clicked" : ""}
      paperSelectedP1={player1Choice === "paper" ? "clicked" : ""}
      paperSelectedP2={player2Choice === "paper" ? "clicked" : ""}
      scissorsSelectedP1={player1Choice === "scissors" ? "clicked" : ""}
      scissorsSelectedP2={player2Choice === "scissors" ? "clicked" : ""}
      player1={"YOU"}
      player2={"COM"}
      gameType={"vs-com"}
      styleRock={handleStyleRock()}
      stylePaper={handleStylePaper()}
      styleScissors={handleStyleScissors()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      result={result}
      handleRefresh={handleRefresh}
      popupVisible={popupVisible}
      popupValue={popupValue}
      handleClosePopup={() => setPopupVisible(false)}
    />
  );
}

export default GameVersusCom;
