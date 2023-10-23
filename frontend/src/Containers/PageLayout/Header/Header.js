import React, { useEffect, useState, useContext } from "react";
import Navbar from "Components/Navbar/Navbar";
import SignUpLogInLinkGroup from "Containers/SignUpLogInLinkGroup/SignUpLogInLinkGroup";
import SignedInGroup from "../../SignedInGroup/SignedInGroup";
import { AuthContext } from "../../../AuthContext";
import LogoHomeLink from "Components/LogoHomeLink/LogoHomeLink";

import "./Header.css";

const Header = ({ api, isAuth, setIsAuth }) => {
  const { user } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [headerStyle, setHeaderStyle] = useState("header");

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const listenScrollEvent = (event) => {
    if (window.scrollY < 50) {
      return setHeaderStyle("header");
    } else if (window.scrollY > 53) {
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
        <div className="button-group">
          {!isMenuOpen && (
            <div className="home-logo-header">
              <LogoHomeLink height="75px" margin="0.5rem 0" />
            </div>
          )}
          {isAuth ? (
            <SignedInGroup api={api} isMenuOpen={isMenuOpen} />
          ) : (
            <SignUpLogInLinkGroup api={api} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
