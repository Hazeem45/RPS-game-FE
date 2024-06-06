import React from "react";
import "./styles/popover.css";

function Popover({title, child1, child2, handleClose, handleClickChild1, handleClickChild2}) {
  return (
    <div className="popover">
      <h3>{title}</h3>
      <div className="popover-child">
        <div onClick={handleClickChild1}>{child1}</div>
        <div className={child2 ? "" : "displayNone"} onClick={handleClickChild2}>
          {child2}
        </div>
        <div onClick={handleClose}>Cancel</div>
      </div>
    </div>
  );
}

export default Popover;
