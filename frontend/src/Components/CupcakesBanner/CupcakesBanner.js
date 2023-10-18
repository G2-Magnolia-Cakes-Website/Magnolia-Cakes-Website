import React, { useEffect, useState } from "react";
import "./CupcakesBanner.css";

const CupcakesBanner = ({ api }) => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    api
      .get("/api/homepage-welcome/")
      .then((response) => {
        setBanner(response.data.banner);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  console.log("kim", banner);

  return (
    <>
      {banner && (
        <div
          className="cupcakes-banner"
          style={{ backgroundImage: `url(${banner})` }}
        />
      )}
    </>
  );
};

export default CupcakesBanner;
