import React, { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Header.css";
import SignUpLogInLinkGroup from "../../SignUpLogInLinkGroup/SignUpLogInLinkGroup";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {!isMenuOpen && <SignUpLogInLinkGroup />}
    </div>
  );
};

export default Header;
