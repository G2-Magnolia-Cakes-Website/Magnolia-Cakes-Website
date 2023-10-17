import React from "react";
import { Cross } from "hamburger-react";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";

import "./WelcomePopup.css";

const WelcomePopup = ({ onClose, user }) => {
  return (
    <div className="welcome-popup">
      <div className="welcome-content">
        <div className="cross">
          <Cross toggled={true} onToggle={onClose} />
        </div>
        <p>
          Welcome, {user.first_name} {user.last_name}!
        </p>
        <div className="thanks-button">
          <RoseGoldButton
            buttonText="Thanks!"
            onClick={onClose}
            width="fit-content"
            margin="15px 10px"
            padding="5px 25px"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
