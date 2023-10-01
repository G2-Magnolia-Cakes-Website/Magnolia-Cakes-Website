import React from "react";

import "./SquareButton.css";

const SquareButton = (props) => {
  const { buttonText, onClick, isUnfilled, isSmall, color } = props;

  const getStyle = () => {
    if (isUnfilled && !isSmall) {
      return "square-button unfilled";
    }
    if (isSmall && !isUnfilled) {
      return "square-button small";
    }
    if (isSmall && isUnfilled) {
      return "square-button unfilled small";
    }
    return "square-button";
  };

  return (
    <button
      className={getStyle()}
      style={{ color: color, borderColor: color }}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default SquareButton;
