import React from "react";
import "./ViewCart.css";

import { useNavigate } from "react-router-dom";
import { PAGELINKS } from "utils/constants";

const ViewCart = () => {

    const navigate = useNavigate();

  const onViewCartClick = () => {
    navigate(PAGELINKS.PAYMENT);
  };

    return (
        <div className="logout-div">
            <button className="logout" onClick={() => onViewCartClick()}>
                View Cart
            </button>

        </div>
    );
};

export default ViewCart;