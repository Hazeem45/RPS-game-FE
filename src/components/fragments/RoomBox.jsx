import React from "react";
import "./styles/roomBox.css";

function RoomBox({roomName, player1, player2, status, handleClick}) {
  return (
    <div className="room" onClick={handleClick}>
      <h3>{roomName}</h3>
      <div>
        <div className="room-info">
          <h4>Player 1</h4>
          <div style={{margin: "0 5px"}}>:</div>
          <p>{player1}</p>
        </div>
        <div className="room-info">
          <h4>Player 2</h4>
          <div style={{margin: "0 5px"}}>:</div>
          <p>{player2}</p>
        </div>
        <div className="room-info">
          <h4>Status</h4>
          <div style={{margin: "0 5px 0 18px"}}>:</div>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}

export default RoomBox;
