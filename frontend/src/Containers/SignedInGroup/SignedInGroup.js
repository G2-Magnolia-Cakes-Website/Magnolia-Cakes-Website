import React from "react";
import LogoutLink from "../../Components/LogoutLink/LogoutLink";

const SignedInGroup = ( { api, user } ) => {
    console.log(user);
    return (
        <div>
            {/* TODO username + profile page link */}
            {/* Welcome {user.first_name} {user.last_name}! */}
            <LogoutLink api={api} />
        </div>
    );
};

export default SignedInGroup;
