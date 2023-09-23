import React, { useState, useEffect } from 'react';
import './GalleryPage.css';

const GalleryPage = ({ api }) => {
  const all = { id: -1, name: 'All' };  // Corrected 'name' property here
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(all);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch gallery categories
    api.get('/api/gallery/categories/')
      .then(response => {
        setCategories([all, ...response.data]);  // Include 'all' as the first category
        handleCategoryChange(all);  // Set default category to 'all'
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, [api]);

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    let endpoint;
    if (category.id === all.id) {
      endpoint = '/api/gallery/items/';
    } else {
      endpoint = `/api/gallery/items/?category=${category.id}`;
    }
  
    api.get(endpoint)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => console.error('Error fetching images:', error));
  };

  const filteredImages = selectedCategory.id === all.id
    ? images
    : images.filter(image => image.categories.includes(selectedCategory.id));

    return (
      <div className="GalleryPage">
        <h1 className="PageHeader">Gallery</h1>
        <div className="GalleryCategory">
          {categories.map(category => (
            <button
              key={category.id}
              className={selectedCategory.id === category.id ? 'selected-category' : 'category'}
              onClick={() => handleCategoryChange(category)}
            >
              {category.name.toUpperCase()}
            </button>
          ))}
        </div>
  
        <div className="image-grid">
          {filteredImages.map(image => (
            <img
              key={image.id}
              src={image.image}
              alt={image.title}
            />
          ))}
        </div>
      </div>
    );
  };

export default GalleryPage;
