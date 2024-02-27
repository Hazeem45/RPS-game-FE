import React from "react";
import "./styles/aboutGame.css";
import TitleIcon from "../fragments/TitleIcon";

function AboutGame() {
  return (
    <div className="about-game">
      <TitleIcon />
      <h4>
        RPS or Rock Paper Scissors is considered the oldest hand game in the world. In fact, the game dates all the way back to the Chinese Han Dynasty. This era began in 206 BC and ended in 220 AD. There are also accounts of this game in
        Japanese history.
      </h4>
    </div>
  );
}

export default AboutGame;
