import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import SquareButton from '../SquareButton/SquareButton';

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
                let res = await fetch("http://127.0.0.1:8000/api/login/", {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        username: email,
                        password: password,
                    }),
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    setPassword("");
                    setEmail("");
                    setSubmitted(true);
                    setError(false);
                    navigate("/");
                } else {
                    setError(true);
                    console.log(resJson);
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
