import React, { useState, useEffect } from "react";
import "./GalleryPage.css";
import ImagePopup from "./ImagePopup.js";
import { getGalleryCategoryParam } from "utils/getGalleryCategoryParam";
import BarLoader from "react-spinners/BarLoader";

const GalleryPage = ({ api }) => {
  const all = { id: -1, name: "All" }; // Corrected 'name' property here
  const [selectedCategory, setSelectedCategory] = useState(all);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const queryParameters = new URLSearchParams(window.location.search);
  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch gallery categories
    api
      .get("/api/gallery/categories/")
      .then((response) => {
        const additionalCategories = response.data.sort((a, b) => {
          return a.id - b.id;
        });
        setCategories([all, ...additionalCategories]); // Include 'all' as the first category
        const categoryQuery = queryParameters.get("category");
        if (categoryQuery) {
          const category = additionalCategories.find(
            (c) => getGalleryCategoryParam(c.name) === categoryQuery
          );
          handleCategoryChange(category);
        } else {
          handleCategoryChange(all); // Set default category to 'all'
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [api]);

  const handleCategoryChange = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    let endpoint;
    if (category.id === all.id) {
      endpoint = "/api/gallery/items/";
    } else {
      endpoint = `/api/gallery/items/?category=${category.id}`;
    }

    api
      .get(endpoint)
      .then((response) => {
        setImages(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching images:", error));

    // eslint-disable-next-line no-restricted-globals
    history.pushState(
      null,
      "",
      "/gallery/?category=" + getGalleryCategoryParam(category.name)
    ); // for the url to change without reloading the whole page
  };

  const filteredImages =
    selectedCategory.id === all.id
      ? images
      : images.filter((image) =>
          image.categories.includes(selectedCategory.id)
        );
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setButtonPopup(true);
  };
  return (
    <div className="GalleryPage">
      <h1 className="PageHeader">Gallery</h1>
      <BarLoader
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={"300px"}
      />
      <div className="GalleryCategory">
        {categories.map((category) => (
          <button
            key={category.id}
            className={
              selectedCategory.id === category.id
                ? "selected-category"
                : "category"
            }
            onClick={() => handleCategoryChange(category)}
          >
            {category.name.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="image-grid">
        {filteredImages.map((image) => (
          <img
            key={image.id}
            src={image.image}
            alt={image.title}
            onClick={() => handleImageClick(image)} // Pass the clicked image to handleImageClick
          />
        ))}
        <ImagePopup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          imageData={selectedImage}
        />
      </div>
    </div>
  );
};

export default GalleryPage;
