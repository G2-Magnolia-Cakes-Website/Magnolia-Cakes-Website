import React, { useEffect, useState } from "react";
import {
  weddingCover,
  birthdayCover,
  christeningCover,
  cupcakesCover,
  anyOccassionCover,
  kidsBirthdayCover,
} from "utils/gallery";
import GalleryGridItem from "Components/GalleryGridItem/GalleryGridItem";

import "./GallerySection.css";

const GallerySection = ({ api }) => {
  const [heading, setHeading] = useState("Loading...");

  useEffect(() => {
    api
      .get("/api/homepage-gallery/")
      .then((response) => {
        // Set the retrieved content in the state
        setHeading(response.data.heading);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div className="gallery-section-wrapper">
      <h2>{heading}</h2>
      <div className="gallery-row">
        <div className="gallery-column">
          <GalleryGridItem
            src={weddingCover}
            alt="Wedding & Anniversary"
            title="Wedding Anniversary"
            link="/gallery/wedding-and-anniversary"
          />
          <GalleryGridItem
            src={christeningCover}
            alt="Christening & Communion"
            title="Christening Communion"
            link="/gallery/christening-and-communion"
          />
          <GalleryGridItem
            src={cupcakesCover}
            alt="Cupcakes"
            title="Cupcakes"
            link="/gallery/cupcakes"
          />
        </div>
        <div className="gallery-column">
          <GalleryGridItem
            src={birthdayCover}
            alt="Birthday"
            title="Birthday"
            link="/gallery/birthday"
            isOnRight={true}
          />
          <GalleryGridItem
            src={kidsBirthdayCover}
            alt="Kids Birthday"
            title="Kids Birthday"
            link="/gallery/kids-birthday"
            isOnRight={true}
          />
          <GalleryGridItem
            src={anyOccassionCover}
            alt="Any Occassion"
            title="Any Occassion"
            link="/gallery/any-occassion"
            isOnRight={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
