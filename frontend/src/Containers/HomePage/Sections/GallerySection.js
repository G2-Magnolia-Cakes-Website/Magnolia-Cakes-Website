import React from "react";
import { Grid } from "@mui/material";
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
    // <Grid container spacing={2} sx={{ width: "50%" }} margin="0 auto 0 auto">
    //   <GalleryGridItem src={weddingCover} alt="Wedding & Anniversary" />
    //   <GalleryGridItem src={birthdayCover} alt="Birthday" />
    //   <GalleryGridItem src={christeningCover} alt="Christening & Communion" />
    // </Grid>
    <div className="gallery-section-wrapper">
      <h2>Cakes for all occasions</h2>
      <div className="rows-wrapper">
        <div className="row">
          <div className="column">
            <GalleryGridItem src={weddingCover} alt="Wedding & Anniversary" />
            <GalleryGridItem
              src={christeningCover}
              alt="Christening & Communion"
            />
          </div>
          <div className="column">
            <GalleryGridItem src={birthdayCover} alt="Birthday" />
            <GalleryGridItem src={cupcakesCover} alt="Cupcakes" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
