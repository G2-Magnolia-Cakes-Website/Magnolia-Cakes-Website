import React from "react";
import cupcakeBanner from "utils/cupcake-banner.jpg";
import "./CupcakesBanner.css";

const CupcakesBanner = () => {
  return (
    <div className="banner-wrapper">
      <div className="cupcakes-banner" />
      {/* <img src={cupcakeBanner} alt="cupcake banner" className="banner-img" /> */}
    </div>
  );
};

export default CupcakesBanner;
