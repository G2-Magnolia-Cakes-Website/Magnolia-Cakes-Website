import React, { useState } from "react";
import tabs from "../../utils/tabs.json";
//hamburger menu animation from https://hamburger-react.netlify.app/
import { Fade as Hamburger } from "hamburger-react";

import "./Navbar.css";
import NavbarTab from "./NavbarTab";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const renderTabs = () => {
    return tabs.map((tab) => (
      <NavbarTab onMenuItemClick={onMenuItemClick} tab={tab} />
    ));
  };

  return (
    <nav>
      <div className="menu">
        <Hamburger
          toggled={isMenuOpen}
          toggle={setIsMenuOpen}
          color="#000000"
        />
      </div>
      <ul className={isMenuOpen ? "open" : ""}>{renderTabs()}</ul>
    </nav>
  );
};

export default Navbar;
