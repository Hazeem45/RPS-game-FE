import React from "react";

function Label(props) {
  const {name, value, labelClass} = props;

  return (
    <label className={labelClass} htmlFor={name}>
      {value}
    </label>
  );
}

export default Label;
