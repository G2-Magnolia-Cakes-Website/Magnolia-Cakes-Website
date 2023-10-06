import React, { useEffect, useState } from "react";
import ShopMap from "Components/ShopMap/ShopMap";
import { parseStringToParagraphsByNewline } from "utils/parseStringsToArray";
import BarLoader from "react-spinners/BarLoader";

import "./LocationPage.css";

const LocationPage = ({ api }) => {
  const [locationContent, setLocationContent] = useState({
    business_hours_heading: "Business Hours",
    business_hours_info: "Coming Soon...",
    location_heading: "Where to Find Us?",
    location_info: "Coming Soon...",
  });

  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Make a GET request using the passed api instance
    api
      .get("/api/location-page/")
      .then((response) => {
        // Set the retrieved content in the state
        setLocationContent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <>
      <div className="location-page-wrapper">
        <div className="location-info">
          <h2>{locationContent.location_heading}</h2>
          {parseStringToParagraphsByNewline(locationContent.location_info).map(
            (paragraph) => (
              <p className="info">{paragraph}</p>
            )
          )}
          <div className="spacer" />
          <h2>{locationContent.business_hours_heading}</h2>
          {parseStringToParagraphsByNewline(
            locationContent.business_hours_info
          ).map((paragraph) => (
            <p className="info">{paragraph}</p>
          ))}
        </div>
        <ShopMap />
      </div>
      <BarLoader
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={"100%"}
      />
    </>
  );
};

export default LocationPage;
