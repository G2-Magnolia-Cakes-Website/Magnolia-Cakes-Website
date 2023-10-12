import React, { useState } from "react";
import LogoutPopup from "./LogoutPopup.js";
import "./LogoutLink.css";

const LogoutLink = ({ api }) => {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <button className="logout" onClick={() => setButtonPopup(true)}>
        Logout
      </button>
      <LogoutPopup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        api={api}
        position="right center"
      />
    </>
  );
};

export default LogoutLink;
