import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Popup from './TCPopup';
import React from 'react';

export default function SignupForm({ api }) {

    const navigate = useNavigate();

    // States for registration
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [agree, setAgree] = useState(false);

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [buttonPopup, setButtonPopup] = useState(false)

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
    const handlePassword1 = (e) => {
        setPassword1(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword2 = (e) => {
        setPassword2(e.target.value);
        setSubmitted(false);
    };

    const checkboxHandler = () => {
        setAgree(!agree);
    }

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstname === '' || lastname === '' || email === '' || password1 === '' || password2 === '') {
            setError(true);
        }  else {
            // Send API msg to backend
            try {

                const user = {
                    username: email,
                    first_name: firstname,
                    last_name: lastname,
                    password1: password1,
                    password2: password2
                };

                let res = await api.post('http://localhost:8000/api/register/',
                    user,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        // withCredentials: true,
                    }
                );

                if (res.status === 201) {
                    setPassword1("");
                    setPassword2("");
                    setEmail("");
                    setFirstName("")
                    setLastName("")
                    setAgree(false)
                    setError(false);

                    setSubmitted(true);
                } else {
                    setSubmitted(false);
                    setError(true);
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
                // if(err.response.status == 401) {
                //     // setErrorMessage(err.response.data['detail'])
                //     setError(true);
                // }
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
                    value={lastname} type="text" placeholder='Last Name' />

                <input onChange={handleEmail} className="input-signup"
                    value={email} type="email" placeholder='Email' />

                <input onChange={handlePassword1} className="input-signup"
                    value={password1} type="password" placeholder='Password' />

                <input onChange={handlePassword2} className="input-signup"
                    value={password2} type="password" placeholder='Confirm Password' />

                <div>
                    <label htmlFor="agree" className="label">
                        <input type="checkbox" className="checkbox" id="agree" onChange={checkboxHandler} /><a className='pad'></a> I agree to the
                        <button type="button" className='terms-and-conditions' onClick={() => setButtonPopup(true)}><b>terms and conditions</b></button>
                    </label>
                </div>

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup} api={api} position="right center">
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
