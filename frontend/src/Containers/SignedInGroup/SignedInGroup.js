import React from "react";
import LogoutLink from "../../Components/LogoutLink/LogoutLink";
import ProfileLink from "../../Components/UserProfile/ProfileLink"
import "./SignedInGroup.css";
import ViewCart from "../../Components/ViewCart/ViewCart";

const SignedInGroup = ( { api, user } ) => {
    return (
        <div className="signed-in-group">
            <ViewCart api={api}/>
            <LogoutLink api={api} />
            <ProfileLink user={user} />
        </div>
    );
};

export default SignedInGroup;
