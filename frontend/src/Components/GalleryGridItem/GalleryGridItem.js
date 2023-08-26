import React from "react";
import {
  goldCircledLineLeft,
  whiteTriangleLineLeft,
  goldCircledLineRight,
  whiteTriangleLineRight,
} from "../../utils/gallery-lines";

import "./GalleryGridItem.css";

const GalleryGridItem = (props) => {
  const { src, alt, title, link, isOnRight } = props;

  const wrapperStyling = isOnRight
    ? "gallery-grid-item-wrapper row-reverse"
    : "gallery-grid-item-wrapper";

  const getGalleryLinesDirection = () => {
    if (!isOnRight) {
      return (
        <div className="gallery-lines-group">
          <img
            className="gold-line"
            src={goldCircledLineLeft}
            alt="gold line"
          />
          <img
            className="white-line"
            src={whiteTriangleLineLeft}
            alt="white line"
          />
        </div>
      );
    } else {
      return (
        <div className="gallery-lines-group">
          <img
            className="gold-line"
            src={goldCircledLineRight}
            alt="gold line"
          />
          <img
            className="white-line"
            src={whiteTriangleLineRight}
            alt="white line"
          />
        </div>
      );
    }
  };

  return (
    <div className={wrapperStyling}>
      <h4>{title}</h4>
      {getGalleryLinesDirection()}
      <a href={link}>
        <img className="gallery-img" src={src} alt={alt} />
      </a>
    </div>
  );
};

export default GalleryGridItem;
