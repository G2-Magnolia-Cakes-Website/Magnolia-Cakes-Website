import React from "react";
import ViewCartPopup from "./ViewCartPopup.js";
import { useState } from "react";
import { Cart } from "utils/icons";
import "./ViewCart.css";

const ViewCart = ({ api }) => {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <button className="cart-button" onClick={() => setButtonPopup(true)}>
        <img src={Cart} alt="Cart" className="cart-icon" />
      </button>
      <ViewCartPopup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        api={api}
        position="right center"
      />
    </>
  );
};

export default ViewCart;
