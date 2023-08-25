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
      <div className="row">
        <div className="column">
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
          />
        </div>
        <div className="column">
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
            isOnRight={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
