import React from "react";

import "./SquareButton.css";

const SquareButton = (props) => {
  const { buttonText, onClick } = props;

  return (
    <button className={"square-button"} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default SquareButton;
