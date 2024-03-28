import React from "react";
import "./styles/popup.css";

function Popup({children, handleClose}) {
  return (
    <div className="popup">
      <h3>Message :</h3>
      <div>{children}</div>
      <button className="close" onClick={handleClose}>
        X
      </button>
    </div>
  );
}

export default Popup;
