import React, { useState } from "react";
import "./LogoutLink.css";
import LogoutPopup from "./LogoutPopup.js";

const LogoutLink = ( { api } ) => {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="logout-div">
      <button className="logout" onClick={() => setButtonPopup(true)}>
        Logout
      </button>
      <LogoutPopup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        api={api} 
        position="right center"
      />
    </div>
  );
};

export default LogoutLink;
