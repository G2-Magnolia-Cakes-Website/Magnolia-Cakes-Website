import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Popup = ({api}) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasPopupShownBefore = Cookies.get('popupShown');

    if (!hasPopupShownBefore) {
      setShowPopup(true);
      Cookies.set('popupShown', 'true'); 
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="popup">
        {/* Popup content */}
        <div className="popup-content">
          <h3>Popup Title</h3>
          <p>Popup content goes here...</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      </div>
    )
  );
};

export default Popup;