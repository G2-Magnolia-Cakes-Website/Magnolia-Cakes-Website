import React, { useState, useEffect } from 'react';

export default function ProfileForm({ api, email, first_name, last_name }) {
    const [disabledFirstName, setDisableFirstName] = useState(true);
    const [disabledLastName, setDisableLastName] = useState(true);
    const [firstNameValue, setFirstNameValue] = useState(first_name);
    const [lastNameValue, setLastNameValue] = useState(last_name);
    const [isFormModified, setIsFormModified] = useState(false);

    // States for checking the errors
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const defaultErrorMessage = 'Reset password failed! Please enter a correct email.';
    const [errorMessagePrint, setErrorMessage] = useState(defaultErrorMessage);

    useEffect(() => {
        setFirstNameValue(first_name);
        setLastNameValue(last_name);
    }, [first_name, last_name]);

    useEffect(() => {
        if (first_name === firstNameValue && last_name === lastNameValue) {
            setIsFormModified(false);
        }
    }, [firstNameValue, lastNameValue]);

    const handleFirstNameEdit = (event) => {
        event.preventDefault();
        setDisableFirstName(false);
    };

    const handleLastNameEdit = (event) => {
        event.preventDefault();
        setDisableLastName(false);
    };

    const handleFirstNameChange = (event) => {
        setFirstNameValue(event.target.value);
        setIsFormModified(true);
    };

    const handleLastNameChange = (event) => {
        setLastNameValue(event.target.value);
        setIsFormModified(true);
    };

    const handleUpdateAccount = (event) => {
        event.preventDefault();
        // Handle form submission here
        // Only executed when the submit button is clicked
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();
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
                console.log(res);
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
        <div className='account-right'>
            <div className='account-title first-title'>Name</div>
            <label className='account-label'>First Name</label>
            <div className='label-edit'>
                <input
                    value={firstNameValue}
                    disabled={disabledFirstName}
                    onChange={handleFirstNameChange}
                    className='account-input'
                />
                <button onClick={handleFirstNameEdit} className='account-edit-btn'>edit</button>
            </div>

            <label className='account-label'>Last Name</label>
            <div className='label-edit'>
                <input
                    value={lastNameValue}
                    disabled={disabledLastName}
                    onChange={handleLastNameChange}
                    className='account-input'
                />
                <button onClick={handleLastNameEdit} className='account-edit-btn'>edit</button>
            </div>

            <div className='account-title'>Contact</div>
            <label className='account-label'>Email</label>
            <input 
                value={email} 
                disabled={true} 
                className='account-input' 
            />

            <div className='account-title'>Privacy</div>
            <label className='account-label'>Password</label>
            <button onClick={handleChangePassword} className='account-change-btn'>Change Password</button>

            <button type="submit" disabled={!isFormModified} onClick={handleUpdateAccount} className='update-account'>
                Update Account
            </button>

            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
        </div>
    );
}