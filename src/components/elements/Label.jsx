import React from "react";

function Label({name, value, labelClass}) {
  return (
    <label className={labelClass} htmlFor={name}>
      {value}
    </label>
  );
}

export default Label;
