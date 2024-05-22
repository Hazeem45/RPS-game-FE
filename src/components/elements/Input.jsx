import React, {useState} from "react";

function Input({accept, value, type, placeholder, name, handleChange, pattern, required, fileRef}) {
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
      ref={fileRef}
      // onBlur={() => {
      //   setFocused(true);
      // }}
      onFocus={() => setFocused(true)}
      focused={focused.toString()}
      value={value}
      accept={accept}
    />
  );
}

export default Input;
