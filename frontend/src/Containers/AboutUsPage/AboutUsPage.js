import React, { useEffect, useState } from "react";
import { aboutUsPortrait } from "utils/cover";
import BarLoader from "react-spinners/BarLoader";
import magnoliaFlower from "utils/magnolia_transparent.png";

import "./AboutUsPage.css";

const AboutUsPage = ({ api }) => {
  const [content, setContent] = useState([]);
  const [portrait, setPortrait] = useState(aboutUsPortrait);

  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Make a GET request using the passed api instance
    api
      .get("/api/about-us/")
      .then((response) => {
        // Set the retrieved content in the state
        const responseData = response.data;
        setContent(
          responseData.content
            .split("\n")
            .filter((paragraph) => paragraph !== "\r")
        );
        if (responseData.picture) {
          setPortrait(responseData.picture);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div className="about-us-page">
      <div className="portrait-wrapper">
        <img
          className="about-us-portrait"
          src={portrait}
          alt="About Us Portrait"
        />
      </div>
      <div className="page-content">
        <div className="about-us-title">
          <h1>About Us</h1>
          <img
            src={magnoliaFlower}
            alt="Magnolia Flower"
            className="magnolia-flower"
          />
        </div>

        <BarLoader
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          width={"100%"}
        />

        {content.map((paragraph) => (
          <p key={content.indexOf(paragraph)}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
