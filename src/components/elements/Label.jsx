import React from "react";

function Label({name, value, labelClass, handleClick, styleLabel}) {
  return (
    <label style={styleLabel} className={labelClass} htmlFor={name} onClick={handleClick}>
      {value}
    </label>
  );
}

export default Label;
