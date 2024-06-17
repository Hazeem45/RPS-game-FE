import React from 'react';
import './styles/gameBox.css';
import PropTypes from 'prop-types';

function GameBox({ children, onClick }) {
  return (
    <div onClick={onClick} className='game-box'>
      {children}
    </div>
  );
}

GameBox.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default GameBox;
