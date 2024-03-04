import React from "react";
import "./styles/lineWithText.css";

function LineWithText({value}) {
  return (
    <div className="line-with-text">
      <span>{value}</span>
    </div>
  );
}

export default LineWithText;
