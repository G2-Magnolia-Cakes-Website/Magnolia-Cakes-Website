import React from "react";
import { Link } from "react-router-dom";
import { PAGELINKS } from "utils/constants";
import "./SignUpLink.css";

const SignUpLink = () => {
  return (
    <Link className="signup" to={PAGELINKS.SIGNUP_LINK}>
      {PAGELINKS.SIGNUP_TEXT}
    </Link>
  );
};

export default SignUpLink;
