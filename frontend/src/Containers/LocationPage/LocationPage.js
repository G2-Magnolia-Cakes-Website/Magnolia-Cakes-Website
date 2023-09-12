import React from "react";
import ShopMap from "Components/ShopMap/ShopMap";

import "./LocationPage.css";

const LocationPage = () => {
  return (
    <div className="location-page-wrapper">
      <div className="location-info">
        <h2>Where to find us?</h2>
        <p>
          Melbourne
          <br></br>
          VIC 3752
        </p>
        <h2>Business Hours</h2>
        <p>
          Monday - Sunday
          <br></br>
          9:00 am - 18:00 pm
        </p>
      </div>
      <ShopMap />
    </div>
  );
};

export default LocationPage;
