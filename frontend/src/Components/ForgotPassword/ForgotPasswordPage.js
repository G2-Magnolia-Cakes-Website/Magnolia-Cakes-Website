import "./ForgotPasswordPage.css";
import Form from "./ForgotPasswordForm";
import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";
import birthdayCake from "utils/wedding-ann.jpg";
import React from "react";

function ForgotPasswordPage({ api }) {
  const logo = (
    <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
  );

  const image = <img className="login-image" src={birthdayCake} alt="Cake" />;

  return (
    <div className="forgot-password-page">
      {image}
      <div className="form-wrapper">
        {logo}
        <h1 className="forgot-password-header">Reset Your Password?</h1>
        <Form api={api} />
      </div>
    </div>
  );

  // return (
  //   <div className="white-background">
  //     <div className="loginPage">
  //       <div className="login-form">
  //         <div className="centre-form">
  //           <div className="logo-div">{logo}</div>
  //           <div>
  //             <h1 className="login-header">Reset Your Password?</h1>
  //           </div>
  //           <Form api={api} />
  //         </div>
  //       </div>
  //       {image}
  //     </div>
  //   </div>
  // );
}

export default ForgotPasswordPage;
