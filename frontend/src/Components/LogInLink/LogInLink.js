import React from "react";
import { useNavigate } from "react-router-dom";
import { PAGELINKS } from "../../utils/constants";
import "./LogInLink.css";

const LogInLink = () => {
  const navigate = useNavigate();

  return (
    <button
      className="login"
      onClick={() => {
        navigate(PAGELINKS.LOGIN_LINK);
      }}
    >
      {PAGELINKS.LOGIN_TEXT}
    </button>
  );
};

export default LogInLink;
