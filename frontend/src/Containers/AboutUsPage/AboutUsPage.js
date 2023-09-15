import React, { useEffect, useState } from "react";
import { aboutUsPortrait } from "utils/cover";

import "./AboutUsPage.css";

const AboutUsPage = ({ api }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Make a GET request using the passed api instance
    api
      .get("/api/about-us/")
      .then((response) => {
        // Set the retrieved content in the state
        setContent(response.data.content);
        console.log(response.data.content);
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
        {content.split("\n").map((paragraph) => (
          <p>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
