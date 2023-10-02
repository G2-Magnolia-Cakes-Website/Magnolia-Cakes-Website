import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PAGELINKS } from "utils/constants";
import "./ProfileLink.css";

const ProfileLink = ({ user }) => {

    const [firstName, setFirstName] = useState('User');
    const [lastName, setLastName] = useState('Profile');

    useEffect(() => {
        if (user === null) {
            const first_name = localStorage.getItem('first_name');
            const last_name = localStorage.getItem('last_name');
            if (first_name !== null && last_name !== null) {
                setFirstName(first_name);
                setLastName(last_name);
            }
        } else {
            setFirstName(user.first_name);
            setLastName(user.last_name);
        }
    }, [user]);

    return (
        <Link className="profile-link" to={PAGELINKS.PROFILE_LINK}>
            {firstName} {lastName}
        </Link>
    );
};

export default ProfileLink;