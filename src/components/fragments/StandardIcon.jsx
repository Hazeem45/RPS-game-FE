import React from "react";
import "./styles/standardIcon.css";
import Image from "../elements/Image";

function StandardIcon({icon}) {
  return (
    <div className="standard-icon">
      <Image src={icon} />
    </div>
  );
}

export default StandardIcon;
