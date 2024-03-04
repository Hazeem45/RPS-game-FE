import React, {useState} from "react";

function Input({type, placeholder, name, handleChange, pattern, required}) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      id={name}
      onChange={handleChange}
      className="input"
      pattern={pattern}
      required={required}
      // onBlur={() => {
      //   setFocused(true);
      // }}
      onFocus={() => setFocused(true)}
      focused={focused.toString()}
    />
  );
}

export default Input;
