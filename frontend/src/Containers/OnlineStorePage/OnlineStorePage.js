import React, { useState, useEffect } from 'react';
import './OnlineStore.css';

function OnlineStore({ api }) {
  const [cakes, setCakes] = useState([]);
  const [quantities, setQuantities] = useState({}); // Store quantities for each cake

  useEffect(() => {
    // Fetch cakes data from the API
    const fetchCakes = async () => {
      try {
        const response = await api.get("api/cakes/");
        // Initialize quantities for each cake to 0
        const initialQuantities = response.data.reduce((acc, cake) => {
          acc[cake.id] = 0;
          return acc;
        }, {});
        setQuantities(initialQuantities);
        setCakes(response.data);
      } catch (error) {
        console.error("Error fetching cakes:", error);
      }
    };

    fetchCakes();
  }, [api]);

  const handleQuantityChange = (cakeId, event) => {
    const newQuantities = { ...quantities, [cakeId]: parseInt(event.target.value, 10) };
    setQuantities(newQuantities);
  };

  const handleAddToCart = (cake) => {
    // Add the selected cake to the cart
    const cartItem = {
      name: cake.name,
      price: cake.price,
      quantity: quantities[cake.id],
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
    <div>
      <div className="cakes-list">
        {cakes.map((cake) => (
          <div key={cake.id} className="cake-item">
            <h3>{cake.name}</h3>
            <img
              src={cake.image}
              alt={cake.name}
              className="image"
            />
            <br />
            <p>Price: ${cake.price}</p>
            <p>Flavour: {cake.flavor}</p>
            <p>Description: {cake.description}</p>

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
                <button onClick={() => handleAddToCart(cake)}>Add to Cart</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineStore;
