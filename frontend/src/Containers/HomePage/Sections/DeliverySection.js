import React from "react";
import { Car } from "utils/icons";

import "./DeliverySection.css";

const DeliverySection = () => {
  return (
    <div className="delivery-section">
      <p>Delivery available</p>
      <img className="delivery-car" src={Car} alt="Delivery Car" />
      <p className="desktop-view">reach us at 0422-733-882</p>
      <p className="mobile-view">
        reach us at <br /> 0422-733-882
      </p>
    </div>
  );
};

export default DeliverySection;
