import './ProfilePage.css';
import Form from "./ProfileForm"
import React, { useEffect, useState } from "react";

function ProfilePage({ api }) {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email');
        const first_name = localStorage.getItem('first_name');
        const last_name = localStorage.getItem('last_name');
        if (email !== null && first_name !== null && last_name !== null) {
            setEmail(email);
            setFirstName(first_name);
            setLastName(last_name);
        }
    }, []);

    return (
        <div>
            <h1 className='login-header'>Account Settings</h1>
            <div className='info-account'>
                <div>Welcome {firstName}!</div>
                <div>This is where you can edit your profile details and change password.</div>
            </div>
            <Form email={email} first_name={firstName} last_name={lastName} />
        </div>
    );
}

export default ProfilePage;