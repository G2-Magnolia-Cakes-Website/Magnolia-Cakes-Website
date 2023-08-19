import React from "react";

import "./SquareButton.css";

const SquareButton = (props) => {
  const { buttonText, onClick, isUnfilled } = props;

  return (
    <button
      className={isUnfilled ? "square-button unfilled" : "square-button"}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default SquareButton;
