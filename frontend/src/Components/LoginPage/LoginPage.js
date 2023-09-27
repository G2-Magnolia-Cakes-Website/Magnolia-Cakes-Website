import './Login.css';
import Form from "./LoginForm"
import SignedUpPopup from "./SignedUpPopup"
import magnoliaCakeLogo from "../../utils/Magnolia_Cake_logo.png";
import birthdayCake from "../../utils/carousel-wedding-ann.jpg"
import React, { useContext, useEffect, useState } from 'react';

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

    const image = (
        <img className='login-image' src={birthdayCake} alt='Cake Image' />
    )

    return (
        <>
            {showWelcomePopup && <SignedUpPopup onClose={handleCloseWelcomePopup} value={signedUp} />}
            <div className='white-background'>
                <div className="loginPage">
                    <div className='login-form'>
                        <div className='centre-form'>
                            <div className='logo-div'>
                                {logo}
                            </div>
                            <div>
                                <h1 className='login-header'>Log In</h1>
                            </div>
                            <Form api={api} handleLoginSuccess={handleLoginSuccess} />
                        </div>
                    </div>
                    {image}
                </div>
            </div>
        </>
    );
}

export default LoginPage;