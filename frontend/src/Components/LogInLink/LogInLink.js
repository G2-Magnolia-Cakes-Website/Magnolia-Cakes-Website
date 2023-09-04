import React from "react";
import { useNavigate } from "react-router-dom";
import { PAGELINKS } from "utils/constants";
import "./LogInLink.css";

const LogInLink = () => {
  const navigate = useNavigate();

  const onLoginButtonClick = () => {
    navigate(PAGELINKS.LOGIN_LINK);
  };

  return (
    <button className="login" onClick={onLoginButtonClick}>
      {PAGELINKS.LOGIN_TEXT}
    </button>
  );
};

export default LogInLink;
