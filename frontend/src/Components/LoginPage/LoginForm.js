import { useState } from 'react';
import { Link } from "react-router-dom";

export default function LoginForm() {

    // States for registration
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [error, setError] = useState(false);

    // Handling the username change
    const handleUsername = (e) => {
        setUsername(e.target.value);
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

        if (username === '' || email === '' || password === '') {
            setError(true);
        } else {
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
                <div className='msgs'>Please enter all the fields</div>
            </div>
        );
    };

    return (
        <div className="form">

            <form>
                {/* Labels and inputs for form data */}
                <input onChange={handleUsername} className="input"
                    value={username} type="text" placeholder='Username' />

                <input onChange={handlePassword} className="input"
                    value={password} type="password" placeholder='Password' />

                <button onClick={handleSubmit} className="submit-btn"
                    type="submit">
                    Login
                </button>

                <div className="messages">
                    {errorMessage()}
                </div>

            </form>

        </div>
    );
};
