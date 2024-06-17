import React from 'react';
import './styles/roomBox.css';
import PropTypes from 'prop-types';

function RoomBox({ roomName, player1, player2, status, handleClick }) {
  return (
    <div className='room' onClick={handleClick}>
      <h3>{roomName}</h3>
      <div className='detailed-room'>
        <div className='room-info'>
          <h4>Player 1</h4>
          <div>:</div>
          <p>{player1}</p>
        </div>
        <div className='room-info'>
          <h4>Player 2</h4>
          <div>:</div>
          <p>{player2}</p>
        </div>
        <div className='room-info'>
          <h4>Status</h4>
          <div>:</div>
          <p className={status.toLowerCase()}>{status}</p>
        </div>
      </div>
    </div>
  );
}

RoomBox.propTypes = {
  roomName: PropTypes.string.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string,
  status: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default RoomBox;
