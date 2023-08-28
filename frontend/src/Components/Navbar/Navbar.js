import React from "react";
import tabs from "../../utils/tabs.json";
//hamburger menu animation from https://hamburger-react.netlify.app/
import { Fade as Hamburger } from "hamburger-react";

import "./Navbar.css";
import NavbarTab from "./NavbarTab";

const Navbar = (props) => {
  const { isMenuOpen, setIsMenuOpen } = props;

  const onMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const renderTabs = () => {
    return tabs.map((tab) => (
      <NavbarTab
        key={tab.tabLink}
        onMenuItemClick={onMenuItemClick}
        tab={tab}
      />
    ));
  };

  return (
    <nav>
      <div className={!isMenuOpen ? "menu" : "menu open"}>
        <Hamburger
          toggled={isMenuOpen}
          toggle={setIsMenuOpen}
          color={isMenuOpen ? "#000000" : "#b76e79"}
        />
      </div>
      <ul className={isMenuOpen ? "open" : ""}>{renderTabs()}</ul>
    </nav>
  );
};

export default Navbar;
