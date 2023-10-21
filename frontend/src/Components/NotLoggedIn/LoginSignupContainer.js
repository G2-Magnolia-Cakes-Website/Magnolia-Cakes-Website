import React from 'react';
import './LoginSignup.css'
import SignUpLink from "Components/SignUpLink/SignUpLink";
import LogInLink from "Components/LogInLink/LogInLink";

const LoginSignupContainer = ({ api }) => {

  return (
    <div className='not-logged-in'>
      <p>You need to login or signup to access this page.</p>
      <div className='login-and-signup'>
        <div className='links'>
          <LogInLink />
        </div>
        <div className='links'>
          <SignUpLink />
        </div>
      </div>
    </div>
  );
};

export default LoginSignupContainer;