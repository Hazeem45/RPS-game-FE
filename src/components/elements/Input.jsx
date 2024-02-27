import React, {useState} from "react";

function Input(props) {
  const [focused, setFocused] = useState(false);
  const {type, placeholder, name, handleChange, pattern, required} = props;

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
