import React, { useEffect, useState, useContext } from "react";
import Navbar from "Components/Navbar/Navbar";
import SignUpLogInLinkGroup from "Containers/SignUpLogInLinkGroup/SignUpLogInLinkGroup";
import "./Header.css";
import SignedInGroup from "../../SignedInGroup/SignedInGroup";
import { AuthContext } from '../../../AuthContext';

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
        {isAuth ? (
          <SignedInGroup api={api} user={user} />
        ) : (
          !isMenuOpen && <SignUpLogInLinkGroup />
        )}
      </div>
    </div>
  );
};

export default Header;
