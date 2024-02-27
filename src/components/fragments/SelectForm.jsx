import React from "react";
import "./styles/selectForm.css";
import Label from "../elements/Label";
import Select from "../elements/Select";

function SelectBox({name, options, handleChange, label}) {
  return (
    <div className="select-form">
      <Label name={name} value={label} />
      <Select name={name} id={name} options={options} handleChange={handleChange} />
    </div>
  );
}

export default SelectBox;
