import React from 'react';
import './styles/popover.css';
import PropTypes from 'prop-types';

function Popover({ title, child1, child2, handleClose, handleClickChild1, handleClickChild2 }) {
  return (
    <div className='popover'>
      <h3>{title}</h3>
      <div className='popover-child'>
        <div onClick={handleClickChild1}>{child1}</div>
        <div className={child2 ? '' : 'displayNone'} onClick={handleClickChild2}>
          {child2}
        </div>
        <div onClick={handleClose}>Cancel</div>
      </div>
    </div>
  );
}

Popover.propTypes = {
  title: PropTypes.string,
  child1: PropTypes.string,
  child2: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleClickChild1: PropTypes.func.isRequired,
  handleClickChild2: PropTypes.func,
};

export default Popover;
