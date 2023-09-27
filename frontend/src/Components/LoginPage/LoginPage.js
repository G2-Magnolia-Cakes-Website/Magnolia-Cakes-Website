import React, { useEffect, useState } from 'react';
import Form from "./LoginForm"
import SignedUpPopup from "./SignedUpPopup"
import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";
import birthdayCake from "utils/wedding-ann.jpg";

import './LoginPage.css';

function LoginPage({ api, handleLoginSuccess }) {

    // Get the token from the URL query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const signedUp = searchParams.get('success');

    const [showWelcomePopup, setShowWelcomePopup] = useState(false);

    const handleCloseWelcomePopup = () => {
        setShowWelcomePopup(false);
    };

    useEffect(() => {
        if (signedUp) {
            setShowWelcomePopup(true);

            const timer = setTimeout(() => {
                setShowWelcomePopup(false);
            }, 7000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, []);

    const logo = (
        <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
    );

    const image = <img className="login-image" src={birthdayCake} alt="Cake" />;

    return (
        <>
            {showWelcomePopup && <SignedUpPopup onClose={handleCloseWelcomePopup} value={signedUp} />}
            <div className="login-page">
                {image}
                <div className="form-wrapper">
                    {logo}
                    <h1 className="login-header">Log In</h1>
                    <Form api={api} handleLoginSuccess={handleLoginSuccess} />
                </div>
            </div>
        </>
    );
}

export default LoginPage;
