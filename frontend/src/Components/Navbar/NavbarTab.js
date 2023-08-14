import React from "react";
import { NavLink } from "react-router-dom";

const NavbarTab = (props) => {
  const { onMenuItemClick, tab } = props;
  const { tabLink, tabName } = tab;

  return (
    <li onClick={onMenuItemClick}>
      <NavLink to={tabLink}>{tabName}</NavLink>
    </li>
  );
};

export default NavbarTab;
