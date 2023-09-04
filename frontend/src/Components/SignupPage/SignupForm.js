import { useState } from 'react';
import { Link } from "react-router-dom";
import Popup from './Popup';
import React from 'react';

export default function SignupForm({ api }) {

    // States for registration
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastnamename, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [buttonPopup, setButtonPopup] = useState(false)

    // Handling the username change
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    // Handling the username change
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        setSubmitted(false);
    };

    // Handling the username change
    const handleLastName = (e) => {
        setLastName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const checkboxHandler = () => {
        setAgree(!agree);
    }

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send API msg to backend

        if (username === '' || email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <p className='msgs'>Please click the link in your email for verification</p>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <div className='msgs'>Please enter all the fields</div>
            </div>
        );
    };

    return (
        <div className="form">

            <form>
                <input onChange={handleFirstName} className="input-signup"
                    value={firstname} type="text" placeholder='First Name' />

                <input onChange={handleLastName} className="input-signup"
                    value={lastnamename} type="text" placeholder='Last Name' />

                <input onChange={handleEmail} className="input-signup"
                    value={email} type="email" placeholder='Email' />

                <input onChange={handlePassword} className="input-signup"
                    value={password} type="password" placeholder='Password' />

                <input onChange={handlePassword} className="input-signup"
                    value={password} type="password" placeholder='Confirm Password' />

                <div>
                    <label htmlFor="agree" className="label">
                        <input type="checkbox" className="checkbox" id="agree" onChange={checkboxHandler} /><a className='pad'></a> I agree to the
                        <button type="button" className='terms-and-conditions' onClick={() => setButtonPopup(true)}><b>terms and conditions</b></button>
                    </label>
                </div>

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup} position="right center">
                </Popup>

                <button onClick={handleSubmit} disabled={!agree} className="submit-btn"
                    type="submit">
                    Create Account
                </button>

                <div className='signup-question'>Already have an account? <Link to="/login" className='signup-link'>Log in</Link></div>

                {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>

            </form>

        </div>
    );
};
