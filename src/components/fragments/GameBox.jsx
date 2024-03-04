import React from "react";
import "./styles/gameBox.css";

function GameBox({children, onClick}) {
  return (
    <div onClick={onClick} className="game-box">
      {children}
    </div>
  );
}

export default GameBox;
