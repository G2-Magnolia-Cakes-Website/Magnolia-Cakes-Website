import React from "react";
import SquareButton from "../../SquareButton/SquareButton";
import magnoliaCakeLogo from "../../../utils/Magnolia_Cake_logo.png";

import "./CallToAction.css";

const CallToAction = () => {
  const logo = (
    <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
  );

  return (
    <div className="call-to-action-bg">
      <div className="call-to-action-wrapper">
        {logo}
        <h2>Magnolia Cakes and Cupcakes</h2>
        <p>
          Delight in unforgettable moments with our exquisite cakes and
          cupcakes. Order now to experience pure indulgence!
        </p>
        <SquareButton buttonText="Get Started" />
      </div>
      {logo}
    </div>
  );
};

export default CallToAction;