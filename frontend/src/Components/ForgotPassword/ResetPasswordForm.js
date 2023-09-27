import React from 'react';
import { useState } from 'react';

export default function ForgotPasswordForm({ api }) {

    // States for registration
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // States for checking the errors
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const defaultErrorMessage = 'Reset password failed!';
    const [errorMessagePrint, setErrorMessage] = useState(defaultErrorMessage);

    // Handling the email change
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Handling the email change
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === '' || confirmPassword === '') {
            setErrorMessage("Please put a value for both password and confirm password!");
            setError(true);
        } else if (password !== confirmPassword) {
            setErrorMessage("Password and confirm password do not match!");
            setError(true);
        } else {
            // Send API msg to backend
            try {

                // Get the token from the URL query parameters
                const searchParams = new URLSearchParams(window.location.search);
                const token = searchParams.get('token');

                const user = {
                    password: password,
                    token: token
                };

                const url = '/api/reset/password/confirm/?token=' + token

                let res = await api.post(url,
                    user,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    }
                );

                if (res.status === 200) {
                    console.log(res);
                    setSubmitted(true);
                    setError(false);
                    setErrorMessage(defaultErrorMessage);
                } else {
                    setSubmitted(false);
                    if (res.data["detail"]) {
                        setErrorMessage(res.data["detail"]);
                    } else if (res.data["token"]) {
                        setErrorMessage(res.data["token"]);
                    } else if (res.data["password"]) {
                        setErrorMessage(res.data["password"]);
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
                } else if (err.response.data["token"]) {
                    setErrorMessage(err.response.data["token"]);
                } else if (err.response.data["password"]) {
                    setErrorMessage(err.response.data["password"]);
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
                <p className='msgs'>You have successfully changed your password.</p>
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
                <input onChange={handlePassword} className="input-login"
                    value={password} type="password" placeholder='New Password' />

                <input onChange={handleConfirmPassword} className="input-login"
                    value={confirmPassword} type="password" placeholder='Confirm New Password' />

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
