import React from "react";
import "./styles/aboutGame.css";
import TitleIcon from "../fragments/TitleIcon";
import {useNavigate} from "react-router-dom";

function AboutGame() {
  const navigate = useNavigate();
  const style = {
    background: "linear-gradient(194.68deg, #ffb548 11.27%, #f3af34 90.4%)",
    boxShadow: "2.5px 2.5px 0 1px rgba(0, 0, 0, 0.75)",
  };
  return (
    <div className="about-game">
      <TitleIcon iconStyleCustom={style} handleClick={() => navigate("/")} />
      <h4>
        RPS or Rock Paper Scissors is considered the oldest hand game in the world. In fact, the game dates all the way back to the Chinese Han Dynasty. This era began in 206 BC and ended in 220 AD. There are also accounts of this game in
        Japanese history.
      </h4>
    </div>
  );
}

export default AboutGame;
