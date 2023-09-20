import React, { useEffect, useState } from "react";
import Navbar from "Components/Navbar/Navbar";
import SignUpLogInLinkGroup from "Containers/SignUpLogInLinkGroup/SignUpLogInLinkGroup";
import "./Header.css";
import SignedInGroup from "../../SignedInGroup/SignedInGroup";

const Header = ({ api }) => {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    try {
      // get user

      let res = await api.get('/api/user/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          withCredentials: true,
        }
      );
      console.log(api.defaults.headers.common);

      if (res.status === 200) {
        console.log(res.data);
        setUser(res.data);
      } else {
        console.log(res);
      }

    } catch (err) {
      console.log(api.defaults.headers.common);
      console.log(err);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token !== null) {
      fetchUser();
      setIsAuth(true);
    }
  }, [isAuth]);

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
        {isAuth ? <SignedInGroup api={api} user={user} /> : !isMenuOpen && <SignUpLogInLinkGroup />}
      </div>
    </div>
  );
};

export default Header;
