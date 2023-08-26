import React from "react";
import {
  weddingCover,
  birthdayCover,
  christeningCover,
  cupcakesCover,
} from "../../../utils/gallery";
import GalleryGridItem from "../../../Components/GalleryGridItem/GalleryGridItem";

import "./GallerySection.css";

const GallerySection = () => {
  return (
    <div className="gallery-section-wrapper">
      <h2>Cakes for all occasions</h2>
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
            src={cupcakesCover}
            alt="Cupcakes"
            title="Cupcakes"
            link="/gallery/cupcakes"
            isOnRight={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
