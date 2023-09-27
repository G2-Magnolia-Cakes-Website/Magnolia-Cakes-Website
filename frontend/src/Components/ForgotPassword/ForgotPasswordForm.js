import React from 'react';
import { useState } from 'react';

export default function ForgotPasswordForm({ api }) {

    // States for registration
    const [email, setEmail] = useState('');

    // States for checking the errors
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const defaultErrorMessage = 'Reset password failed! Please enter a correct email.';
    const [errorMessagePrint, setErrorMessage] = useState(defaultErrorMessage);

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '') {
            setErrorMessage(defaultErrorMessage);
            setError(true);
        } else {
            // Send API msg to backend
            try {

                const user = {
                    email: email
                };

                let res = await api.post('/api/reset/password/',
                    user,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    }
                );

                if (res.status === 200) {
                    setSubmitted(true);
                    setError(false);
                    setErrorMessage(defaultErrorMessage);
                } else {
                    setSubmitted(false);
                    if (res.data["detail"]) {
                        setErrorMessage(res.data["detail"]);
                    } else if (res.data["email"]) {
                        setErrorMessage(res.data["email"]);
                    } else if (res.data["message"]) {
                        setErrorMessage(res.data["message"]);
                    } else {
                        setErrorMessage(defaultErrorMessage);
                    }
                    setError(true);
                    console.log(res);
                }
            } catch (err) {
                setSubmitted(false);
                console.log(err);
                if (err.response.data["detail"]) {
                    setErrorMessage(err.response.data["detail"]);
                } else if (err.response.data["email"]) {
                    setErrorMessage(err.response.data["email"]);
                } else if (err.response.data["message"]) {
                    setErrorMessage(err.response.data["message"]);
                } else {
                    setErrorMessage(defaultErrorMessage);
                }
                setError(true);
            }
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
                <p className='msgs'>Please click the link in your email, {email}, to set your new password.</p>
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
                <div className='msgs'>{errorMessagePrint}</div>
            </div>
        );
    };

    return (
        <div className="form">

            <form>
                {/* Labels and inputs for form data */}
                <input onChange={handleEmail} className="input-login" autoCapitalize="none"
                    value={email} type="email" placeholder='Email' />

                <button onClick={handleSubmit} className="submit-btn"
                    type="submit">
                    Submit
                </button>
                
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>

            </form>

        </div>
    );
};
