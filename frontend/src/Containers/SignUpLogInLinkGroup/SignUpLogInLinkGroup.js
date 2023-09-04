import React from "react";
import SignUpLink from "Components/SignUpLink/SignUpLink";
import LogInLink from "Components/LogInLink/LogInLink";
import "./SignUpLogInLinkGroup.css";

const SignUpLogInLinkGroup = () => {
  return (
    <div className="signup-login-group">
      <LogInLink />
      <SignUpLink />
    </div>
  );
};

export default SignUpLogInLinkGroup;
