import React from "react";

function Label({name, value, labelClass, handleClick}) {
  return (
    <label className={labelClass} htmlFor={name} onClick={handleClick}>
      {value}
    </label>
  );
}

export default Label;
