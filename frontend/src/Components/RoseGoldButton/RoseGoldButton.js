import React from "react";

import "./RoseGoldButton.css";

const RoseGoldButton = (props) => {
  const { buttonText, buttonType, height, margin } = props;

  return (
    <button
      className="rose-gold-button"
      type={buttonType}
      style={{ height: height, margin: margin }}
    >
      {buttonText}
    </button>
  );
};

export default RoseGoldButton;
