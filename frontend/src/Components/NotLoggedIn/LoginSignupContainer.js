import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpLogInLinkGroup from "Containers/SignUpLogInLinkGroup/SignUpLogInLinkGroup";
import './LoginSignup.css'

const LoginSignupContainer = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className='not-logged-in'>
      <p>You need to login or signup to access this page.</p>
      <div>
        <SignUpLogInLinkGroup />
      </div>
    </div>
  );
};

export default LoginSignupContainer;