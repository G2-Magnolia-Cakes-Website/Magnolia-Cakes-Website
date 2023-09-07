import React from "react";

import "./FormInput.css";

const FormInput = (props) => {
  const { labelText, inputName, inputType, isRequired, placeholder } = props;

  const asterisk = isRequired ? "*" : "";

  return (
    <label htmlFor={inputName} className="form-label">
      {labelText}
      {asterisk}
      <input
        type={inputType}
        name={inputName}
        id={inputName}
        className="form-input"
        placeholder={placeholder}
      ></input>
    </label>
  );
};

export default FormInput;
