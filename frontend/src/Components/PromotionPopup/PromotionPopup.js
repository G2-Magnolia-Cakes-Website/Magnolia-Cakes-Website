import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import Cookies from 'js-cookie';
import './PromotionPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

const Popup = ({ api }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [promotion, setPromotion] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { user } = useContext(AuthContext);

    // Get promotion
    useEffect(() => {
        // Make a GET request using the passed api instance
        api.get('/api/promotions/displayed/')
            .then(response => {
                // Set the retrieved content in the state
                if (response.status === 200) {
                    setPromotion(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Show popup
    const showPopupWithTimeout = () => {
        const timeout = setTimeout(() => {
            setShowPopup(true);
            Cookies.set('popupShown', 'true', { expires: 1 });
        }, 30000); // Delay of 30 seconds (30000 milliseconds)

        return () => clearTimeout(timeout); // Clear the timeout if the component unmounts before the delay
    };

    // Check if need to show popup
    useEffect(() => {
        // Only show popup once
        const hasPopupShownBefore = Cookies.get('popupShown');
        if (!hasPopupShownBefore && promotion) {
            if (promotion.only_logged_in_users) {
                // if logged in required, and is logged in
                const access_token = localStorage.getItem('access_token');
                if (access_token) {
                    showPopupWithTimeout();
                }
            } else {
                // login not required
                showPopupWithTimeout();
            }
        }
    }, [promotion, user]);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(promotion.code);
        // show a success message or perform any other desired action after copying to the clipboard
        setShowSuccessMessage(true);
        // set a timeout to hide the message after a certain duration
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000); // Hide the message after 3 seconds 
    };

    // Render only if there is a promotion
    if (!showPopup || !promotion) {
        return null;
    }

    return (
        showPopup && (
            <>
                {showSuccessMessage && <div className="success-message">Copied to clipboard!</div>}
                <div className='promotion-popup'>
                    <div className='promotion-popup-inner'>
                        <button className='close-btn' onClick={handleClosePopup}>X</button>
                        <div className="promotion-popup-content">
                            <h3>PROMOTION!</h3>
                            <div className="promotion-code-container">
                                <div className="promotion-code">{promotion.code}</div>
                                <button className="copy-btn" onClick={copyToClipboard}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <p>{promotion.description}</p>
                            <button className='yes-btn-welcome' onClick={handleClosePopup}>Thanks!</button>
                        </div>
                    </div>
                </div >
            </>
        )
    );
};

export default Popup;