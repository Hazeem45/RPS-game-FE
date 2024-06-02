import React from "react";
import "./styles/resultBox.css";
import Image from "../elements/Image";
import {CrownIcon} from "../../assets/Image";

function ResultBox({gameType, result}) {
  const renderResultVsCom = () => {
    if (result === "win") {
      return <div className="result-win">you win</div>;
    } else if (result === "lose") {
      return <div className="result-lose">you lose</div>;
    } else {
      return <div className="result-draw">match draw</div>;
    }
  };

  const renderResultVsPlayer = () => {
    if (result === "DRAW") {
      return <div className="result-draw">match draw</div>;
    } else if (result === "YOU WIN") {
      return <div className="result-win">you win</div>;
    } else if (result === "YOU LOSE") {
      return <div className="result-lose">you lose</div>;
    } else {
      return (
        <div className="result-player">
          <div className="icon-result">
            <Image src={CrownIcon} />
          </div>
          <div style={{marginTop: "-80px"}}>{result}</div>
        </div>
      );
    }
  };

  return <div className="result-box">{gameType === "vs-com" ? renderResultVsCom() : renderResultVsPlayer()}</div>;
}

export default ResultBox;
