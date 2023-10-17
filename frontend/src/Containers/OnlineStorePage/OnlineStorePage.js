import React, { useState, useEffect } from 'react';
import './OnlineStore.css';
import BarLoader from "react-spinners/BarLoader";


function OnlineStore({ api }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cakeVariants, setCakeVariants] = useState([]);
  const [selectedCakeVariants, setSelectedCakeVariants] = useState({});

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem('access_token')) {

      setLoading(false);
    } else {

      // Fetch cakes data from the API
      const fetchCakes = async () => {
        try {
          const response = await api.get("api/products/");
          const initialQuantities = response.data.reduce((acc, product) => {
            acc[product.id] = 0;
            return acc;
          }, {});
          setQuantities(initialQuantities);
          setProducts(response.data);
          
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products:", error);
          setLoading(true);
        }
      };
      fetchCakes();
      
    }
  }, [api]);
  

  const handleQuantityChange = (productId, event) => {
    const newQuantities = { ...quantities, [productId]: parseInt(event.target.value, 10) };
    
    setQuantities(newQuantities);
  };
  
  const handleAddToCart = (product) => {
    // show a success message or perform any other desired action after copying to the clipboard
    setShowSuccessMessage(true);
    // set a timeout to hide the message after a certain duration
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hide the message after 3 seconds 
    
    const cakeVariant = cakeVariants
    .find((cakeVariant) => cakeVariant.id === parseInt(selectedCakeVariants[product.id]))
    console.log(cakeVariant)
    // Retrieve existing cart items or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem('Cart')) || [];

    if (product.product_type === 'Cupcake') {
      // Add the selected cupcake to the cart
      const cartItem = {
        name: product.name,
        type: 'cupcake',
        price: product.price,
        quantity: quantities[product.id],
        videoId: null,
        cakeId: product.id
      };
  
      // Check if the item already exists in the cart
      const existingCartItemIndex = existingCart.findIndex(item => item.name === product.name);
  
      if (existingCartItemIndex !== -1) {
        // Item already exists, update its quantity
        existingCart[existingCartItemIndex].quantity += cartItem.quantity;
      } else {
        // Item doesn't exist, add it to the cart
        existingCart.push(cartItem);
      }
    } else if (product.product_type === 'Cake' && cakeVariant) {
      // Add the selected cake variant to the cart for cake products
      const cartItem = {
        name: product.name + " - " + cakeVariant.size,
        type: 'cake',
        price: cakeVariant.price,
        quantity: quantities[product.id],
        videoId: null,
        cakeId: cakeVariant.id,
      };
  
      // Check if the item already exists in the cart
      const existingCartItemIndex = existingCart.findIndex(item => item.name === product.name && item.variantId === selectedCakeVariants[product.id]);
  
      if (existingCartItemIndex !== -1) {
        // Item already exists, update its quantity
        existingCart[existingCartItemIndex].quantity += cartItem.quantity;
      } else {
        // Item doesn't exist, add it to the cart
        existingCart.push(cartItem);
      }
    }
  
    // Store the updated cart in local storage
    localStorage.setItem('Cart', JSON.stringify(existingCart));
  };
  

  const fetchCakeVariants = async (cakeId) => {
    try {
      const response = await api.get('api/cakes/');
      setCakeVariants(response.data );

    } catch (error) {
      console.error('Error fetching cake variants:', error);
    }
  };
  
  useEffect(() => {
    // Fetch cake variants for each cake product
    products.forEach((product) => {
      if (product.product_type === 'Cake') {
        fetchCakeVariants(product.id);
      }
    });
  }, [products]);
  

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
  
        <div className="cakes-list">

          {products.map((product) => (
            <div key={product.id} className="cake-item">

              <img
                src={product.image}
                alt={product.name}
                className="image"
              />
              <br /><br></br>
              <h3>{product.name}</h3>
              
              <p>Flavour: {product.flavor}</p>
              <p>Type: {product.product_type}</p>
              {product.product_type === 'Cake' && (
                <div className="quantity-section">
                  <select
                    id={`type-${product.id}`}
                    onChange={(event) => {
                      const selectedVariantId = event.target.value;
                      setSelectedCakeVariants({
                        ...selectedCakeVariants,
                        [product.id]: selectedVariantId,
                      });
                    }}
                  >
                    <option disabled selected>
                      Select variant
                    </option>
                    {cakeVariants
                      .filter((cakeVariant) => cakeVariant.cake === product.id)
                      .map((cakeVariant) => (
                        <option key={cakeVariant.id} value={cakeVariant.id}>
                          {cakeVariant.size} - ${cakeVariant.price}
                        </option>
                      ))}
                  </select>
                </div>
              )}


              {product.product_type === 'Cupcake' && <p>Price: ${product.price}</p>}

              <div className="quantity-section">
                <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${product.id}`}
                  value={quantities[product.id]}
                  onChange={(event) => handleQuantityChange(product.id, event)}
                  min={product.product_type === 'Cupcake' ? 12 : 0}
                  step={product.product_type === 'Cupcake' ? 6 : 1}
                />
              </div>

              {
                (product.product_type === 'Cupcake' && quantities[product.id] > 0) || (product.product_type === 'Cake' 
                && selectedCakeVariants[product.id] && quantities[product.id] > 0) ? (
                  <div className="buttons-section">
                    <button className="button" onClick={() => handleAddToCart(product)}>
                      ADD TO CART
                    </button>
                  </div>
                ) : (
                  <div className="buttons-section">
                    <button className="button" disabled>
                      ADD TO CART
                    </button>
                  </div>
                )
              }


            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OnlineStore;
