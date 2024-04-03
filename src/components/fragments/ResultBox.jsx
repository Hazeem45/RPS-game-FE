import React from "react";
import "./styles/resultBox.css";

function ResultBox({result}) {
  const renderResult = () => {
    if (result === "win") {
      return <div className="result-win">you win</div>;
    } else if (result === "lose") {
      return <div className="result-lose">you lose</div>;
    } else {
      return <div className="result-draw">match draw</div>;
    }
  };

  return <div className="result-box">{renderResult()}</div>;
}

export default ResultBox;
