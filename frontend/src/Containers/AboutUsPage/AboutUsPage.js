import React, { useEffect, useState } from "react";
import { aboutUsPortrait } from "utils/cover";
import BarLoader from "react-spinners/BarLoader";

import "./AboutUsPage.css";

const AboutUsPage = ({ api }) => {
  const [content, setContent] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Make a GET request using the passed api instance
    api
      .get("/api/about-us/")
      .then((response) => {
        // Set the retrieved content in the state
        setContent(
          response.data.content
            .split("\n")
            .filter((paragraph) => paragraph !== "\r")
        );
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
          src={aboutUsPortrait}
          alt="About Us Portrait"
        />
      </div>
      <div className="page-content">
        <h1>About Us</h1>

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
