import React, { useEffect, useState } from "react";
import Navbar from "Components/Navbar/Navbar";
import SignUpLogInLinkGroup from "Containers/SignUpLogInLinkGroup/SignUpLogInLinkGroup";
import "./Header.css";
import SignedInGroup from "../../SignedInGroup/SignedInGroup";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [headerStyle, setHeaderStyle] = useState("header");

  const listenScrollEvent = (event) => {
    if (window.scrollY < 137) {
      return setHeaderStyle("header");
    } else if (window.scrollY > 140) {
      return setHeaderStyle("header colored");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
       setIsAuth(true); 
     }
   }, [isAuth]);

  return (
    <div className={headerStyle}>
      <div className="navbar-signup-login-group">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {isAuth ? <SignedInGroup /> : !isMenuOpen && <SignUpLogInLinkGroup />}
      </div>
    </div>
  );
};

export default Header;
