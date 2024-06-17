import React, { useState } from 'react';
import './styles/listOfChoices.css';
import Image from '../elements/Image';
import { PaperIcon, RockIcon, ScissorsIcon } from '../../assets/Image';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ListOfChoices({ username, player, styleRock, stylePaper, styleScissors, onRock, onPaper, onScissors, onMouseLeave, onClick, classForRock, classForPaper, classForScissors }) {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [onHover, setOnHover] = useState(null);

  const handleClick = () => {
    if (username !== 'YOU' && username !== 'COM' && username !== 'Waiting...') {
      navigate(`/${username}`);
    }
  };

  const handleMouseEnter = (e) => {
    setOnHover(e.target.textContent);
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const styleUsername = {
    transform: isHover && 'scale(1.2)',
    cursor: isHover && 'pointer',
    textDecoration: isHover && 'underline',
    transition: '300ms',
  };

  const hoverStyle = () => {
    if (onHover !== 'YOU' && onHover !== 'COM' && onHover !== 'Waiting...') {
      return styleUsername;
    }
  };

  return (
    <div className='list-of-choices'>
      <h3 onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={hoverStyle()}>
        {username}
      </h3>
      <h4>{player}</h4>
      <div className='choices'>
        <div className={`image ${classForRock}`} id='rock' style={styleRock} onMouseEnter={onRock} onMouseLeave={onMouseLeave} onClick={onClick}>
          <Image src={RockIcon} alt='rock' />
        </div>
        <div className={`image ${classForPaper}`} id='paper' style={stylePaper} onMouseEnter={onPaper} onMouseLeave={onMouseLeave} onClick={onClick}>
          <Image src={PaperIcon} alt='paper' />
        </div>
        <div className={`image ${classForScissors}`} id='scissors' style={styleScissors} onMouseEnter={onScissors} onMouseLeave={onMouseLeave} onClick={onClick}>
          <Image src={ScissorsIcon} alt='scissors' />
        </div>
      </div>
    </div>
  );
}

ListOfChoices.propTypes = {
  username: PropTypes.string,
  player: PropTypes.string,
  styleRock: PropTypes.object,
  stylePaper: PropTypes.object,
  styleScissors: PropTypes.object,
  onRock: PropTypes.func,
  onPaper: PropTypes.func,
  onScissors: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  classForRock: PropTypes.string,
  classForPaper: PropTypes.string,
  classForScissors: PropTypes.string,
};

export default ListOfChoices;
