import React from 'react';
import './SignedUpPopup.css';

const SignedUpPopup = ({ onClose, value }) => {
    return (
        <div className="signedup-popup">
            <div className="signedup-content">
                <button className='close-btn' onClick={onClose}>X</button>
                {value === 'true' && <p>Successfully signed up! You can now log in.</p>}
                {value === 'true' && <button className='yes-btn-signedup' onClick={onClose}>Thanks!</button>}
                {value === 'false' && <p>Signup failed! Please try signing up again or contact an administrator.</p>}
                {value === 'false' && <button className='yes-btn-signedup' onClick={onClose}>Okay</button>}                
            </div>
        </div>
    );
};

export default SignedUpPopup;