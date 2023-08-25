import React from "react";
import { Grid } from "@mui/material";
import { goldCircledLine, whiteTriangleLine } from "../../utils/gallery-lines";

import "./GalleryGridItem.css";

const GalleryGridItem = (props) => {
  const { src, alt } = props;

  return (
    <div className="gallery-grid-item-wrapper">
      <h4>Wedding Anniversary</h4>
      <div className="gallery-lines-group">
        <img className="gold-line" src={goldCircledLine} alt="gold line" />
        <img className="white-line" src={whiteTriangleLine} alt="white line" />
      </div>
      <img className="gallery-img" src={src} alt={alt} />
    </div>
    // <Grid xs={6} display="flex" justifyContent="center">
    // </Grid>
  );
};

export default GalleryGridItem;
