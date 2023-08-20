import { useState } from 'react';
import { Link } from "react-router-dom";
import SquareButton from '../SquareButton/SquareButton';

export default function LoginForm() {

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
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send API msg to backend

        if (email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            // Send to homepage
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
                <div className='msgs'>Please enter all the fields!</div>
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
