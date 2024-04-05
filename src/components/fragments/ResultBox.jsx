import React from "react";
import "./styles/resultBox.css";

function ResultBox({playerName, gameType, result}) {
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
    if (result === "win") {
      return (
        <div className="result-player">
          <div>
            <div>{playerName[0]}</div>
            <div>is the Winner</div>
          </div>
        </div>
      );
    } else if (result === "lose") {
      return (
        <div className="result-player">
          <div>
            <div>{playerName[1]}</div>
            <div>is the Winner</div>
          </div>
        </div>
      );
    } else {
      return <div className="result-draw">match draw</div>;
    }
  };

  return <div className="result-box">{gameType === "vs-com" ? renderResultVsCom() : renderResultVsPlayer()}</div>;
}

export default ResultBox;
