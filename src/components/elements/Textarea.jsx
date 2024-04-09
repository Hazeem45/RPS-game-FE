import React from "react";

function Textarea({style, handleChange, maxLength, id}) {
  return <textarea style={style} onChange={handleChange} maxLength={maxLength} id={id}></textarea>;
}

export default Textarea;
