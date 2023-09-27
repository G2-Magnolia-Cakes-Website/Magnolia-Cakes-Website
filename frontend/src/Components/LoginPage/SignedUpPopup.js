import React from 'react';

const SignedUpPopup = ({ onClose, value }) => {
    return (
        <div className="welcome-popup">
            <div className="welcome-content">
                <button className='close-btn' onClick={onClose}>X</button>
                {value === 'true' && <p>successfully signed up! Please try logging in.</p>}
                {value === 'false' && <p>Signup failed! Please try signing up again or contact an administrator.</p>}
                <div>
                    <button className='yes-btn-welcome' onClick={onClose}>Thanks!</button>
                </div>
            </div>
        </div>
    );
};

export default SignedUpPopup;