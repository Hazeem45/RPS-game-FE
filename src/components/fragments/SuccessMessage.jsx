import React from "react";
import "./styles/successMessage.css";

function SuccessMessage({children}) {
  return <div className="success-message">{children}</div>;
}

export default SuccessMessage;
