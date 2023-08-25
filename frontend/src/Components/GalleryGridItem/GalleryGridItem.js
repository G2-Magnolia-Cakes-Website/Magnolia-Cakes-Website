import React from "react";
import { goldCircledLine, whiteTriangleLine } from "../../utils/gallery-lines";

import "./GalleryGridItem.css";

const GalleryGridItem = (props) => {
  const { src, alt, title, link, isOnRight } = props;

  const wrapperStyling = isOnRight
    ? "gallery-grid-item-wrapper row-reverse"
    : "gallery-grid-item-wrapper";

  return (
    <div className={wrapperStyling}>
      <h4>{title}</h4>
      <div className="gallery-lines-group">
        <img className="gold-line" src={goldCircledLine} alt="gold line" />
        <img className="white-line" src={whiteTriangleLine} alt="white line" />
      </div>
      <a href={link}>
        <img className="gallery-img" src={src} alt={alt} />
      </a>
    </div>
  );
};

export default GalleryGridItem;
