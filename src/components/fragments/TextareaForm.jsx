import React from "react";
import "./styles/textareaForm.css";
import Label from "../elements/Label";
import Textarea from "../elements/Textarea";

function TextareaForm({value, style, name, label, handleChange, textLength, maxLength}) {
  return (
    <div className="textarea-form">
      <Label name={name} value={label} labelClass={name} />
      <Textarea style={style} handleChange={handleChange} maxLength={maxLength} id={name} value={value}></Textarea>
      <p>
        {textLength ? textLength : 0}/{maxLength}
      </p>
    </div>
  );
}

export default TextareaForm;
