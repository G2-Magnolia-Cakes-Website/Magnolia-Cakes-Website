import React from "react";

import "./FormTextArea.css";

const FormTextArea = (props) => {
  const {
    labelText,
    inputName,
    isRequired,
    placeholder,
    inputRef,
    value,
    onChange,
    autoCapitalize,
  } = props;

  const asterisk = isRequired ? "*" : "";

  return (
    <label htmlFor={inputName} className="form-label">
      {labelText}
      {asterisk}
      <textarea
        name={inputName}
        id={inputName}
        className="form-textarea"
        placeholder={placeholder}
        required={isRequired}
        ref={inputRef}
        value={value}
        onChange={onChange}
        autoCapitalize={autoCapitalize}
      ></textarea>
    </label>
  );
};

export default FormTextArea;
