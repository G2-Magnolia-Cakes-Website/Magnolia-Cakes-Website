import { useState } from 'react';
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import TermsAndConditionsTest from './TermsAndConditionsTest'

export default function SignupForm({result, failMessage}) {

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
        if (username === '' || email === '' || password === '') {
            failMessage("Please enter all the fields")
            setError(true);
        } else {
            result("User successfully registered!!")
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
                <p className='msgs'>User {username} successfully registered!!</p>
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
                <p className='msgs'>Please enter all the fields</p>
            </div>
        );
    };

    return (
        <div className="form">

            <form>
                {/* Labels and inputs for form data */}
                <input onChange={handleUsername} className="input"
                    value={username} type="text" placeholder='Username' />

                <input onChange={handleFirstName} className="input"
                    value={firstname} type="text" placeholder='First Name' />

                <input onChange={handleLastName} className="input"
                    value={lastnamename} type="text" placeholder='Last Name' />

                <input onChange={handleEmail} className="input"
                    value={email} type="email" placeholder='Email' />

                <input onChange={handlePassword} className="input"
                    value={password} type="password" placeholder='Password' />

                {/* <div>
                    <label htmlFor="agree" className="label">
                        <input type="checkbox" className="checkbox" id="agree" onChange={checkboxHandler} /> I agree to <Link to={'/terms'}><b>terms and conditions</b></Link>
                    </label>
                </div> */}

                <div>
                    <label htmlFor="agree" className="label">
                        <input type="checkbox" className="checkbox" id="agree" onChange={checkboxHandler} /><a className='pad'></a> I agree to
                        <Popup trigger={<button type="button" className='terms-and-conditions'><b>terms and conditions</b></button>} position="right center">
                            <TermsAndConditionsTest />
                        </Popup>
                    </label>
                </div>

                {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>

                <button onClick={handleSubmit} disabled={!agree} className="submit-btn"
                    type="submit">
                    Create Account
                </button>
            </form>

        </div>
    );
};

// export default SignupForm;
