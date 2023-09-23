import React from "react";

import "./CarouselItem.css";

const CarouselItem = (props) => {
  const { image, title } = props;

  return (
    <div className="slide-wrapper">
      <img src={image} alt={title} />
    </div>
  );
};

export default CarouselItem;
