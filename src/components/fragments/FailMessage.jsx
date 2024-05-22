import React from "react";
import "./styles/failMessage.css";

function FailMessage({children}) {
  return <div className="fail-message">{children}</div>;
}

export default FailMessage;
