import React from "react";
import LogoutLink from "../../Components/LogoutLink/LogoutLink";
import ProfileLink from "../../Components/UserProfile/ProfileLink";
import ViewCart from "../../Components/ViewCart/ViewCart";
import "./SignedInGroup.css";

const SignedInGroup = ({ api, isMenuOpen }) => {
  return (
    <div className="signed-in-group">
      <ViewCart api={api} />
      <LogoutLink api={api} />
      <ProfileLink isMenuOpen={isMenuOpen} />
    </div>
  );
};

export default SignedInGroup;
