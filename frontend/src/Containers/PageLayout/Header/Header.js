import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import SignUpLogInLinkGroup from "../../SignUpLogInLinkGroup/SignUpLogInLinkGroup";
import "./Header.css";

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

  return (
    <div className={headerStyle}>
      <div className="navbar-signup-login-group">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {!isMenuOpen && <SignUpLogInLinkGroup />}
      </div>
    </div>
  );
};

export default Header;
