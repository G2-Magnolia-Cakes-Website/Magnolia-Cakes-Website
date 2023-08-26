import React from "react";
// import { useNavigate } from "react-router-dom";
import { PAGELINKS } from "../../utils/constants";
import "./LogoutLink.css";
import LogoutPopup from "./LogoutPopup.js"
import { useState } from 'react';

const LogoutLink = () => {

    const [buttonPopup, setButtonPopup] = useState(false)

    return (
        <div className="logout-div">
            <button className="logout" onClick={() => setButtonPopup(true)}>
                Logout
            </button>
            <LogoutPopup trigger={buttonPopup} setTrigger={setButtonPopup} position="right center" />
        </div>
    );
};

export default LogoutLink;
