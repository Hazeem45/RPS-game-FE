import React from "react";
import "./styles/checkboxForm.css";
import Input from "../elements/Input";
import Label from "../elements/Label";

function ShowPassword({styleCustom, handleChange, value, name}) {
  return (
    <div style={styleCustom} className="input-checkbox">
      <Input type="checkbox" handleChange={handleChange} name={name} />
      <Label labelClass="checkbox" name={name} value={value} />
    </div>
  );
}

export default ShowPassword;
