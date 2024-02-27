import React from "react";
import "./styles/titleIcon.css";
import IconGame from "../../assets/image/icon.png";

function TitleIcon() {
  return (
    <div className="title-icon">
      <div>
        <img src={IconGame} width="30" />
      </div>
      <h2>RPS Game</h2>
    </div>
  );
}

export default TitleIcon;
