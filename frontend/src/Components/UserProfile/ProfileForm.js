import React, { useState, useEffect } from 'react';

export default function ProfileForm({ email, first_name, last_name }) {
    const [disabledFirstName, setDisableFirstName] = useState(true);
    const [disabledLastName, setDisableLastName] = useState(true);
    const [firstNameValue, setFirstNameValue] = useState(first_name);
    const [lastNameValue, setLastNameValue] = useState(last_name);
    const [isFormModified, setIsFormModified] = useState(false);

    useEffect(() => {
        setFirstNameValue(first_name);
        setLastNameValue(last_name);
    }, [first_name, last_name]);

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

    const handleChangePassword = (event) => {
        event.preventDefault();
        // Handle form submission here
        // Only executed when the submit button is clicked
    };

    return (
        <div>
            <div>Name</div>
            <label>First Name</label>
            <input
                value={firstNameValue}
                disabled={disabledFirstName}
                onChange={handleFirstNameChange}
            />
            <button onClick={handleFirstNameEdit}>edit</button>
            <label>Last Name</label>
            <input
                value={lastNameValue}
                disabled={disabledLastName}
                onChange={handleLastNameChange}
            />
            <button onClick={handleLastNameEdit}>edit</button>
            <div>Contact</div>
            <label>Email</label>
            <input value={email} disabled={true} />
            <div>Privacy</div>
            <label>Password</label>
            <button onClick={handleChangePassword}>Change Password</button>
            <button type="submit" disabled={!isFormModified} onClick={handleUpdateAccount}>
                Update Account
            </button>
        </div>
    );
}