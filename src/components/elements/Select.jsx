import React from "react";

function Select({name, options, handleChange}) {
  return (
    <select id={name} name={name} onChange={handleChange}>
      {options.map((options) => {
        return (
          <option key={options} value={options}>
            {options}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
