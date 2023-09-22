import React, { useState, useEffect } from 'react';


const GalleryPage = ({api}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch gallery categories
    api.get('/api/gallery/categories/')
      .then(response => {
        setCategories(['all', ...response.data.map(category => category.name)]); // Extract category names
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      // Fetch all images
      api.get('/api/gallery/items/')
        .then(response => {
          setImages(response.data);
        })
        .catch(error => console.error('Error fetching images:', error));
    } else {
      // Fetch images for the selected category
      api.get(`/api/gallery/items/?category=${category}`)
        .then(response => {
          setImages(response.data);
        })
        .catch(error => console.error('Error fetching images:', error));
    }
  };

  return (
    <div>
      <h1>Gallery</h1>
      <label htmlFor="category">Select a category: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <div className="image-grid">
        {images.map(image => (
          <img key={image.id} src={image.image} alt={image.title} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
