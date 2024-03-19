import React from "react";
import "./styles/listOfChoices.css";
import Image from "../elements/Image";
import {PaperIcon, RockIcon, ScissorsIcon} from "../../assets/Image";

function ListOfChoices(props) {
  const {username, styleRock, stylePaper, styleScissors, onRock, onPaper, onScissors, onMouseLeave, onClick, classForRock, classForPaper, classForScissors} = props;

  return (
    <div className="list-of-choices">
      <h3>{username}</h3>
      <div className="choices">
        <div className={`image ${classForRock}`} id="rock" style={styleRock} onMouseEnter={onRock} onMouseLeave={onMouseLeave} onClick={onClick}>
          <Image src={RockIcon} alt="rock" />
        </div>
        <div className={`image ${classForPaper}`} id="paper" style={stylePaper} onMouseEnter={onPaper} onMouseLeave={onMouseLeave} onClick={onClick}>
          <Image src={PaperIcon} alt="paper" />
        </div>
        <div className={`image ${classForScissors}`} id="scissors" style={styleScissors} onMouseEnter={onScissors} onMouseLeave={onMouseLeave} onClick={onClick}>
          <Image src={ScissorsIcon} alt="scissors" />
        </div>
      </div>
    </div>
  );
}

export default ListOfChoices;
