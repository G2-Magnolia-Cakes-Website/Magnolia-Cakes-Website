import React from "react";
// import "./Signup.css";
import Form from "./SignupForm";
import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";
import birthdayCake from "utils/wedding-ann.jpg";
import "./SignupPage.css";

function SignupPage({ api }) {
  const logo = (
    <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
  );

  const image = <img className="signup-image" src={birthdayCake} alt="Cake" />;

  return (
    <div className="signup-page">
      {image}
      <div className="form-wrapper">
        {logo}
        <h1 className="signup-header">Sign Up</h1>
        <Form api={api} />
      </div>
    </div>
  );
}

export default SignupPage;
