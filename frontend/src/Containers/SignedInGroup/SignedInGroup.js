import React from "react";
import LogoutLink from "../../Components/LogoutLink/LogoutLink";
import ProfileLink from "../../Components/UserProfile/ProfileLink"
import "./SignedInGroup.css";

const SignedInGroup = ( { api, user } ) => {
    return (
        <div className="signedin-group">
            <LogoutLink api={api} />
            <ProfileLink user={user} />
        </div>
    );
};

export default SignedInGroup;
