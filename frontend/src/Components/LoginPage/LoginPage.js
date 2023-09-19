import React from "react";
import Form from "./LoginForm";
import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";
import birthdayCake from "utils/wedding-ann.jpg";

import "./LoginPage.css";

function LoginPage({ api }) {
  const logo = (
    <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
  );

  const image = <img className="login-image" src={birthdayCake} alt="Cake" />;

  return (
    <div className="login-page">
      {image}
      <div className="form-wrapper">
        {logo}
        <h1 className="login-header">Log In</h1>
        <Form api={api} />
      </div>
    </div>
  );

  //   return (
  //     <div className="white-background">
  //       <div className="loginPage">
  //         <div className="login-form">
  //           <div className="centre-form">
  //             {/* <div className="logo-div">{logo}</div> */}
  //             {logo}
  //             <div>
  //               <h1 className="login-header">Log In</h1>
  //             </div>
  //             <Form api={api} />
  //           </div>
  //         </div>
  //         {image}
  //       </div>
  //     </div>
  //   );
}

export default LoginPage;
