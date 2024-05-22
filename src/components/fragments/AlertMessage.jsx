import React from "react";
import "./styles/alertMessage.css";
import Image from "../elements/Image";
import {WarningIcon} from "../../assets/Image";
import Button from "../elements/Button";

function AlertMessage({handleButton, butonText, title, children}) {
  return (
    <div className="alert-message">
      <div className="alert-box">
        <div className="title">
          <Image src={WarningIcon} />
          <h3>{title}</h3>
        </div>
        <div className="message-content">
          <p>{children}</p>
        </div>
        <div className="alert-button">
          <Button handleClick={handleButton}>{butonText}</Button>
        </div>
      </div>
    </div>
  );
}

export default AlertMessage;
