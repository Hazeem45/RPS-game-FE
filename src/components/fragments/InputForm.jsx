import React from "react";
import "./styles/inputForm.css";
import Label from "../elements/Label";
import Input from "../elements/Input";
import ErrorMessage from "../elements/ErrorMessage";

function InputForm({value, name, label, type, placeholder, handleChange, errorMessage, pattern, required, styleLabel}) {
  return (
    <div className="input-form">
      <Label styleLabel={styleLabel} name={name} value={label} labelClass={name} />
      <Input type={type} placeholder={placeholder} name={name} handleChange={handleChange} pattern={pattern} required={required} value={value} />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

export default InputForm;
