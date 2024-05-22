import React from "react";

function Textarea({style, handleChange, maxLength, id, value}) {
  return <textarea style={style} onChange={handleChange} maxLength={maxLength} id={id} value={value}></textarea>;
}

export default Textarea;
