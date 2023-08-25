import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Header.css";
import SignUpLogInLinkGroup from "../../SignUpLogInLinkGroup/SignUpLogInLinkGroup";
import LogoutLink from "../../../Components/LogoutLink/LogoutLink"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
       setIsAuth(true); 
     }
   }, [isAuth]);

  return (
    <div className="header">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isAuth ? <LogoutLink /> : !isMenuOpen && <SignUpLogInLinkGroup />}
    </div>
  );
};

export default Header;
