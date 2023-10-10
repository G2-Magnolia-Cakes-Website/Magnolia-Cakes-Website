import React, { useState, useEffect } from 'react';
import './OnlineStore.css';
import BarLoader from "react-spinners/BarLoader";

function OnlineStore({ api }) {
  const allCategory = { id: -1, name: 'All' };
  const [cakes, setCakes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(allCategory);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch cakes data from the API
    const fetchCakes = async () => {
      try {
        const response = await api.get("api/cakes/");
        const initialQuantities = response.data.reduce((acc, cake) => {
          acc[cake.id] = 0;
          return acc;
        }, {});
        setQuantities(initialQuantities);
        setCakes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cakes:", error);
        setLoading(true);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/gallery/categories/");
        setCategories([allCategory, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(true);
      }
    };

    fetchCakes();
    fetchCategories();
  }, [api]);

  const handleCategoryChange = (category) => {
    console.log('Selected Category:', category);
    setSelectedCategory(category);
  };

  const filteredCakes = selectedCategory.id === allCategory.id
    ? cakes
    : cakes.filter(cake => cake.categories.includes(selectedCategory.id));



  const handleQuantityChange = (cakeId, event) => {
    const newQuantities = { ...quantities, [cakeId]: parseInt(event.target.value, 10) };
    setQuantities(newQuantities);
  };

  const handleAddToCart = (cake) => {
    // show a success message or perform any other desired action after copying to the clipboard
    setShowSuccessMessage(true);
    // set a timeout to hide the message after a certain duration
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hide the message after 3 seconds 
    
    // Add the selected cake to the cart
    const cartItem = {
      name: cake.name,
      type: "cake",
      price: cake.price,
      quantity: quantities[cake.id],
      videoId: null
    };

    // Retrieve existing cart items or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem('Cart')) || [];

    // Check if the item already exists in the cart
    const existingCartItemIndex = existingCart.findIndex(item => item.name === cake.name);

    if (existingCartItemIndex !== -1) {
      // Item already exists, update its quantity
      existingCart[existingCartItemIndex].quantity += cartItem.quantity;
    } else {
      // Item doesn't exist, add it to the cart
      existingCart.push(cartItem);
    }

    // Store the updated cart in local storage
    localStorage.setItem('Cart', JSON.stringify(existingCart));
  };


  return (
    <>
    {showSuccessMessage && <div className="success-message">Added to cart!</div>}
    <div className='online-store'>

      <BarLoader
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={"100%"}
      />
      <div className="category-buttons">
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
      <div className="cakes-list">

        {filteredCakes.map((cake) => (
          <div key={cake.id} className="cake-item">

            <img
              src={cake.image}
              alt={cake.name}
              className="image"
            />
            <br /><br></br>
            <h3>{cake.name}</h3>
            <p>Price: ${cake.price}</p>
            <p>Flavour: {cake.flavor}</p>

            <div className="quantity-section">
              <label htmlFor={`quantity-${cake.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${cake.id}`}
                value={quantities[cake.id]}
                onChange={(event) => handleQuantityChange(cake.id, event)}
                min={0}
              />
            </div>

            {quantities[cake.id] > 0 && (
              <div className="buttons-section">
                <button className='button' onClick={() => handleAddToCart(cake)}>ADD TO CART</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default OnlineStore;
