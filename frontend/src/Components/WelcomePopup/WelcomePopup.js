import React, { useState } from 'react';
import './WelcomePopup.css';

const WelcomePopup = ({ onClose, user }) => {
    return (
        <div className="welcome-popup">
            <div className="welcome-content">
                <button className='close-btn' onClick={onClose}>X</button>
                <p>Welcome, {user.first_name} {user.last_name}!</p>
                <div>
                    <button className='yes-btn-welcome' onClick={onClose}>Thanks!</button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePopup;