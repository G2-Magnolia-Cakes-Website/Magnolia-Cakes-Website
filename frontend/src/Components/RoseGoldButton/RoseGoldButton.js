import React from "react";

import "./RoseGoldButton.css";

const RoseGoldButton = (props) => {
  const { buttonText, buttonType, disabled, height, margin, width, onClick } =
    props;

  return (
    <button
      className="rose-gold-button"
      type={buttonType}
      style={{ height: height, margin: margin, width: width }}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default RoseGoldButton;
