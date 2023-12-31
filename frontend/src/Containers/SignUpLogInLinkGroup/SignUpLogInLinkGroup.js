import React from "react";
import SignUpLink from "Components/SignUpLink/SignUpLink";
import LogInLink from "Components/LogInLink/LogInLink";
import ViewCart from "Components/ViewCart/ViewCart";
import "./SignUpLogInLinkGroup.css";

const SignUpLogInLinkGroup = ( { api } ) => {
  return (
    <div className="signup-login-group">
      <ViewCart api={api} />
      <LogInLink />
      <SignUpLink />
    </div>
  );
};

export default SignUpLogInLinkGroup;
