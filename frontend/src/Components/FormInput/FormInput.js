import React from "react";

import "./FormInput.css";

const FormInput = (props) => {
  const {
    labelText,
    inputName,
    inputType,
    isRequired,
    placeholder,
    inputRef,
    value,
    onChange,
    autoCapitalize,
    min,
    max,
    disabled,
  } = props;

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
        required={isRequired}
        ref={inputRef}
        value={value}
        onChange={onChange}
        autoCapitalize={autoCapitalize}
        min={min}
        max={max}
        disabled={disabled}
      ></input>
    </label>
  );
};

export default FormInput;
