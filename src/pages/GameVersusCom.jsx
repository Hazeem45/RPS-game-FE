import React, {useEffect, useState} from "react";
import RoomDetail from "../components/templates/RoomDetail";

function GameVersusCom() {
  const [isHover, setIsHover] = useState(false);
  const [onHover, setOnHover] = useState("");
  const [isChoiceDecided, setIsChoiceDecided] = useState(false);
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    // game rules and set the result of game
    if ((player1Choice === "rock" && player2Choice === "rock") || (player1Choice === "paper" && player2Choice === "paper") || (player1Choice === "scissors" && player2Choice === "scissors")) {
      setResult("draw");
    } else if ((player1Choice === "rock" && player2Choice === "scissors") || (player1Choice === "paper" && player2Choice === "rock") || (player1Choice === "scissors" && player2Choice === "paper")) {
      setResult("win");
    } else if ((player1Choice === "rock" && player2Choice === "paper") || (player1Choice === "paper" && player2Choice === "scissors") || (player1Choice === "scissors" && player2Choice === "rock")) {
      setResult("lose");
    }
  }, [player1Choice, player2Choice]);

  // style box when hover
  const hoverStyle = {
    transform: isHover ? "scale(1.15)" : "",
    transition: "transform 0.2s",
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
      alert("refresh for new games");
    } else {
      setPlayer1Choice(e.target.alt);
      setIsChoiceDecided(true);
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

  // refresh handling
  const handleRefresh = () => {
    setIsChoiceDecided(false);
    setPlayer1Choice("");
    setPlayer2Choice("");
    setResult("");
  };

  return (
    <RoomDetail
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
    />
  );
}

export default GameVersusCom;
