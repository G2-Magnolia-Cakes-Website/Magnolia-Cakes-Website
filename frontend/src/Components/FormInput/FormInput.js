import React from "react";

import "./FormInput.css";

const FormInput = (props) => {
  const { labelText, inputName, inputType } = props;

  return (
    <label htmlFor={inputName} className="form-label">
      {labelText}
      <input
        type={inputType}
        name={inputName}
        id={inputName}
        className="form-input"
      ></input>
    </label>
  );
};

export default FormInput;
