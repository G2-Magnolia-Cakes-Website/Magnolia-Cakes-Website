import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm( { api } ) {

    const navigate = useNavigate();

    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [error, setError] = useState(false);
    const defaultErrorMessage = 'Login failed! Please enter a correct username and password. Note that both fields may be case-sensitive.';
    const [errorMessagePrint, setErrorMessage] = useState(defaultErrorMessage);

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErrorMessage(defaultErrorMessage);
            setError(true);
        } else {
            // Send API msg to backend
            try {

                const user = {
                    username: email,
                    password: password
                };

                let res = await api.post('/api/token/',
                    user,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        withCredentials: true,
                    }
                );

                if (res.status === 200) {
                    setPassword("");
                    setEmail("");
                    setError(false);
                    setErrorMessage(defaultErrorMessage);

                    // Initialize the access & refresh token in localstorage.      
                    localStorage.clear();
                    localStorage.setItem('access_token', res.data.access);
                    localStorage.setItem('refresh_token', res.data.refresh);
                    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;

                    navigate("/");
                    navigate(0);
                } else {
                    if (res.data["detail"]) {
                        setErrorMessage(res.data["detail"]);
                    } else if (res.data["message"]) {
                        setErrorMessage(res.data["message"]);
                    } else { 
                        setErrorMessage(defaultErrorMessage);
                    }
                    setError(true);
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
                if (err.response.data["detail"]) {
                    setErrorMessage(err.response.data["detail"]);
                } else if (err.response.data["message"]) {
                    setErrorMessage(err.response.data["message"]);
                } else { 
                    setErrorMessage(defaultErrorMessage);
                }
                setError(true);
            }
        }
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

                <input onChange={handlePassword} className="input-login"
                    value={password} type="password" placeholder='Password' />

                <button onClick={handleSubmit} className="submit-btn"
                    type="submit">
                    Login
                </button>

                <div className='signup-question'>Don't have an account? <Link to="/signup" className='signup-link'>Sign up for free</Link></div>

                <div className="messages">
                    {errorMessage()}
                </div>

            </form>

        </div>
    );
};
