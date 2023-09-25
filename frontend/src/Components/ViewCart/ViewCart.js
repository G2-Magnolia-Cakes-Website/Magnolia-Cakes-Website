import React from "react";
import "./ViewCart.css";
import ViewCartPopup from "./ViewCartPopup.js"
import { useState } from 'react';

const ViewCart = () => {

    const [buttonPopup, setButtonPopup] = useState(false)

    return (
        <div className="logout-div">
            <button className="logout" onClick={() => setButtonPopup(true)}>
                View Cart
            </button>
            <ViewCartPopup trigger={buttonPopup} setTrigger={setButtonPopup} position="right center" />
        </div>
    );
};

export default ViewCart;