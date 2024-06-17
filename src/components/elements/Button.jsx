import React from 'react';
import PropTypes from 'prop-types';

function Button({ handleClick, children, styleCustom }) {
  const styleDefault = {
    background: 'linear-gradient(194.68deg, #ffb548 11.27%, #f3af34 90.4%)',
    boxShadow: '0 1px 2px 0px black',
  };

  return (
    <button style={styleCustom || styleDefault} onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  styleCustom: PropTypes.object,
};

export default Button;
