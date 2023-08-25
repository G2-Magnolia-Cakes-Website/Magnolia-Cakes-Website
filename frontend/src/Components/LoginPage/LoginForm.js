import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {

    const navigate = useNavigate();

    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

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

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setError(true);
        } else {
            // Send API msg to backend
            try {

                const user = {
                    username: email,
                    password: password
                };

                let res = await axios.post('http://localhost:8000/api/token/',
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
                    setSubmitted(true);
                    setError(false);

                    // Initialize the access & refresh token in localstorage.      
                    localStorage.clear();
                    localStorage.setItem('access_token', res.data.access);
                    localStorage.setItem('refresh_token', res.data.refresh);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res['access']}`;

                    navigate("/");
                    navigate(0);
                } else {
                    setError(true);
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
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
                <div className='msgs'>Login failed! Please enter a correct username and password. Note that both fields may be case-sensitive.</div>
            </div>
        );
    };

    return (
        <div className="form">

            <form>
                {/* Labels and inputs for form data */}
                <input onChange={handleEmail} className="input-login"
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
