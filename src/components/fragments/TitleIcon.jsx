import React from "react";
import "./styles/titleIcon.css";
import IconGame from "../../assets/image/icon.png";
import Image from "../elements/Image";

function TitleIcon({iconStyleCustom}) {
  return (
    <div className="title-icon" style={iconStyleCustom}>
      <div className="image">
        <Image src={IconGame} />
      </div>
      <h2>RPS Game</h2>
    </div>
  );
}

export default TitleIcon;
