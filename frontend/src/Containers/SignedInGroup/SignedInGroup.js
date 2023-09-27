import React from "react";
import LogoutLink from "../../Components/LogoutLink/LogoutLink";
import ProfileLink from "../../Components/UserProfile/ProfileLink"
import "./SignedInGroup.css";
import ViewCart from "../../Components/ViewCart/ViewCart";
import "./SignedInGroup.css";

const SignedInGroup = ( { api, user } ) => {
    return (
        <div className="signed-in-group" className="signedin-group">
            <ViewCart/>
            <LogoutLink api={api} />
            <ProfileLink user={user} />
        </div>
    );
};

export default SignedInGroup;
