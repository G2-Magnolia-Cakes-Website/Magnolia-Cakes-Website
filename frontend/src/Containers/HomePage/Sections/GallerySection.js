import React, { useEffect, useState } from "react";
import GalleryGridItem from "Components/GalleryGridItem/GalleryGridItem";
import { getGalleryCategoryParam } from "utils/getGalleryCategoryParam";
import { everyFirst, everyNth } from "utils/getEveryNthElementInArray";

import "./GallerySection.css";

const GallerySection = ({ api }) => {
  const [heading, setHeading] = useState("Loading...");
  const [categories, setCategories] = useState([]);

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

    api
      .get("/api/gallery/categories/")
      .then((response) => {
        setCategories(
          response.data.sort((a, b) => {
            return a.id - b.id;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div className="gallery-section-wrapper">
      <h2>{heading}</h2>
      {categories.length <= 0 && <p>Loading...</p>}
      {categories.length > 0 && (
        <div className="gallery-row">
          <div className="gallery-column">
            {everyFirst(categories).map((category) => (
              <GalleryGridItem
                key={category.id}
                src={category.picture}
                alt={category.name}
                title={category.name}
                link={
                  "/gallery/?category=" + getGalleryCategoryParam(category.name)
                }
              />
            ))}
          </div>
          <div className="gallery-column">
            {everyNth(categories, 2).map((category) => (
              <GalleryGridItem
                key={category.id}
                src={category.picture}
                alt={category.name}
                title={category.name}
                link={
                  "/gallery/?category=" + getGalleryCategoryParam(category.name)
                }
                isOnRight={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
