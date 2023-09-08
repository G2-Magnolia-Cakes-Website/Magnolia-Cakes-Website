import { useState } from 'react';
import { Link } from "react-router-dom";
import React from 'react';

export default function SignupForm({ api }) {

    // States for registration
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const defaultErrorMessage = 'Please enter all the fields!';
    const [errorMessagePrint, setErrorMessage] = useState(defaultErrorMessage);

    // Handling the username change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the phone number change
    const handlePhone = (e) => {
        setPhone(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the message
    const handleMessage = (e) => {
        setMessage(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || phone === '' || email === '' || message === '') {
            setErrorMessage(defaultErrorMessage);
            setError(true);
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
                <p className='msgs'>{name}, you have successfully sent your message.</p>
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
                <input onChange={handleName} className="input-signup"
                    value={name} type="text" placeholder='First Name' />

                <input onChange={handlePhone} className="input-signup"
                    value={phone} type="text" placeholder='Last Name' />

                <input onChange={handleEmail} className="input-signup"
                    value={email} type="email" placeholder='Email' />

                <input onChange={handleMessage} className="input-signup"
                    value={message} type="text" placeholder='Password' />
                
                <button onClick={handleSubmit} className="submit-btn" type="submit">
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
