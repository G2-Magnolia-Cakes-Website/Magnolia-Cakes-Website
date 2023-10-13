import React from "react";
import "./SignedUpPopup.css";
import { Cross } from "hamburger-react";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";

const SignedUpPopup = ({ onClose, value }) => {
  return (
    <div className="signedup-popup">
      <div className="signedup-content">
        <div className="cross">
          <Cross toggled={true} onToggle={onClose} />
        </div>
        {value === "true" && (
          <>
            <p>Successfully signed up! You can now log in.</p>
            <RoseGoldButton buttonText="Thanks!" onClick={onClose} />
          </>
        )}
        {value === "false" && (
          <>
            <p>
              Signup failed! Please try signing up again or contact an
              administrator.
            </p>
            <RoseGoldButton buttonText="Okay" onClick={onClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default SignedUpPopup;
