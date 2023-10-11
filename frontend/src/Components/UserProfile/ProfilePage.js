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
        <>
            <h1 className='profile-header'>Account Settings</h1>
            <div className='profile-side-by-side'>
                <div className='profile-white-background'>
                        <div className='profile-welcome'>Welcome {firstName}!</div>
                        <div className='profile-info'>This is where you can edit your profile details and change password.</div>
                </div>
                <div className='profile-white-background'>
                    <Form api={api} email={email} first_name={firstName} last_name={lastName} />
                </div>
                <div className='profile-white-background'>
                    Your Purchases
                </div>
            </div>
        </>
    );
}

export default ProfilePage;