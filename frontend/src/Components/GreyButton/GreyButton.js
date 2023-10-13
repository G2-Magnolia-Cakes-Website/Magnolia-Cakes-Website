import React from "react";

import "./GreyButton.css";

const GreyButton = (props) => {
  const {
    buttonText,
    buttonType,
    disabled,
    height,
    margin,
    width,
    onClick,
    padding,
  } = props;

  return (
    <button
      className="grey-button"
      type={buttonType}
      style={{ height: height, margin: margin, width: width, padding: padding }}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default GreyButton;
