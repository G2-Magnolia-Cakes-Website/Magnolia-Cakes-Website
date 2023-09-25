import React from "react";
import LogoutLink from "../../Components/LogoutLink/LogoutLink";
import ViewCart from "../../Components/ViewCart/ViewCart";
import "./SignedInGroup.css";

const SignedInGroup = () => {
    return (
        <div className="signed-in-group">
            {/* TODO username + profile page link */}
            <ViewCart/>
            <LogoutLink />
        </div>
    );
};

export default SignedInGroup;
