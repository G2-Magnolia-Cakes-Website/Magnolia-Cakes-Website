import React from "react";

import "./CarouselItem.css";

const CarouselItem = (props) => {
  const { image, title } = props;

  return (
    <div className="slide-wrapper">
      <img src={"carousel/" + image} alt={title} />
    </div>
  );
};

export default CarouselItem;
