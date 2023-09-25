import React from "react";
// import "./ForgotPassword.css";
import Form from "./ResetPasswordForm";
import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";
import birthdayCake from "utils/wedding-ann.jpg";
import "./ResetPasswordPage.css";

function ResetPasswordPage({ api }) {
  const logo = (
    <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
  );

  const image = <img className="login-image" src={birthdayCake} alt="Cake" />;

  return (
    <div className="reset-password-page">
      {image}
      <div className="form-wrapper">
        {logo}
        <h1 className="reset-password-header">Enter Your New Password</h1>
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
  //             <h1 className="login-header">Enter Your new Password</h1>
  //           </div>
  //           <Form api={api} />
  //         </div>
  //       </div>
  //       {image}
  //     </div>
  //   </div>
  // );
}

export default ResetPasswordPage;
