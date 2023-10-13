import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthContext';
import BarLoader from "react-spinners/BarLoader";

export default function ProfileForm({ api, email, first_name, last_name }) {

    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    // Loading
    const [loading, setLoading] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const [disabledFirstName, setDisableFirstName] = useState(true);
    const [disabledLastName, setDisableLastName] = useState(true);
    const [firstNameValue, setFirstNameValue] = useState(first_name);
    const [lastNameValue, setLastNameValue] = useState(last_name);
    const [isFormModified, setIsFormModified] = useState(false);

    // States for checking the errors
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const defaultPasswordResetErrorMessage = 'Reset password failed! Please enter a correct email.';
    const defaultChangeNamesErrorMessage = 'Account update failed! Please try again later.';
    const [errorMessagePrint, setErrorMessage] = useState(defaultPasswordResetErrorMessage);

    useEffect(() => {
        setFirstNameValue(first_name);
        setLastNameValue(last_name);
    }, [first_name, last_name]);

    useEffect(() => {
        if (first_name === firstNameValue.trim() && last_name === lastNameValue.trim()) {
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

    const handleUpdateAccount = async (event) => {
        event.preventDefault();
        setLoading(true);
        // Send API msg to backend
        if (firstNameValue === '' || lastNameValue === '') {
            setSubmitted(false);
            setErrorMessage("Cannot leave First Name or Last Name blank.");
            setError(true);
        } else {
            try {

                const user = {
                    first_name: firstNameValue,
                    last_name: lastNameValue
                };

                let res = await api.post('/api/reset/names/',
                    user,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        },
                        withCredentials: true,
                    }
                );

                if (res.status === 200) {
                    setError(false);
                    await getUserDetails();
                    window.location.reload();
                } else {
                    setSubmitted(false);
                    if (res.data["detail"]) {
                        setErrorMessage(res.data["detail"]);
                    } else if (res.data["email"]) {
                        setErrorMessage(res.data["email"]);
                    } else if (res.data["first_name"]) {
                        setErrorMessage(res.data["first_name"]);
                    } else if (res.data["last_name"]) {
                        setErrorMessage(res.data["last_name"]);
                    } else if (res.data["message"]) {
                        setErrorMessage(res.data["message"]);
                    } else {
                        setErrorMessage(defaultChangeNamesErrorMessage);
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
                } else if (err.response.data["first_name"]) {
                    setErrorMessage(err.response.data["first_name"]);
                } else if (err.response.data["last_name"]) {
                    setErrorMessage(err.response.data["last_name"]);
                } else if (err.response.data["message"]) {
                    setErrorMessage(err.response.data["message"]);
                } else {
                    setErrorMessage(defaultChangeNamesErrorMessage);
                }
                setError(true);
            }
        }
        setLoading(false);
    };

    const getUserDetails = async (e) => {
        setLoading(true);
        try {
            // get user

            let res = await api.get('/api/user/',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('first_name', res.data.first_name);
                localStorage.setItem('last_name', res.data.last_name);
                setUser(res.data);
                setLoading(false);
            } else {
                console.log(res);
            }

        } catch (err) {
            console.log(err);
            console.log(err.response.data);
        }
    }

    const handleChangePassword = async (event) => {
        event.preventDefault();
        setLoadingPassword(true);
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
                setErrorMessage(defaultPasswordResetErrorMessage);
            } else {
                setSubmitted(false);
                if (res.data["detail"]) {
                    setErrorMessage(res.data["detail"]);
                } else if (res.data["email"]) {
                    setErrorMessage(res.data["email"]);
                } else if (res.data["message"]) {
                    setErrorMessage(res.data["message"]);
                } else {
                    setErrorMessage(defaultPasswordResetErrorMessage);
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
                setErrorMessage(defaultPasswordResetErrorMessage);
            }
            setError(true);
        }
        setLoadingPassword(false);
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success-profile"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <p className='msgs-profile'>Please click the link in your email, {email}, to set your new password.</p>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error-profile"
                style={{
                    display: error ? '' : 'none',
                }}>
                <div className='msgs-profile'>{errorMessagePrint}</div>
            </div>
        );
    };

    // If not logged in:
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
    }, []);

    return (
        <div>

            <div className='profile-title first-title'>Contact</div>
            <label className='profile-label'>Email</label>
            <input
                value={email}
                disabled={true}
                className='profile-input'
            />

            <div className='profile-title name-title'>Name</div>
            <label className='profile-label'>First Name</label>
            <div className='label-edit'>
                <input
                    value={firstNameValue}
                    disabled={disabledFirstName}
                    onChange={handleFirstNameChange}
                    className='profile-input'
                />
                <button onClick={handleFirstNameEdit} className='profile-edit-btn'>edit</button>
            </div>

            <label className='profile-label'>Last Name</label>
            <div className='label-edit'>
                <input
                    value={lastNameValue}
                    disabled={disabledLastName}
                    onChange={handleLastNameChange}
                    className='profile-input'
                />
                <button onClick={handleLastNameEdit} className='profile-edit-btn'>edit</button>
            </div>

            <button type="submit" disabled={!isFormModified} onClick={handleUpdateAccount} className='update-profile'>
                Update Account
            </button>
            <BarLoader
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
                width={"100%"}
            />

            <hr />

            <div className='profile-title'>Privacy</div>
            <label className='profile-label password-label'>Password</label>
            <button onClick={handleChangePassword} className='profile-change-btn'>Change Password</button>
            <BarLoader
                loading={loadingPassword}
                aria-label="Loading Spinner"
                data-testid="loader"
                width={"100%"}
            />

            <div className="messages-profile">
                {errorMessage()}
                {successMessage()}
            </div>
        </div>
    );
}