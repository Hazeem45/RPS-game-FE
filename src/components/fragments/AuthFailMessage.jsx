import React from "react";
import "./styles/authFailMessage.css";

function AuthFailMessage({children}) {
  return <div className="auth-fail-message">{children}</div>;
}

export default AuthFailMessage;
