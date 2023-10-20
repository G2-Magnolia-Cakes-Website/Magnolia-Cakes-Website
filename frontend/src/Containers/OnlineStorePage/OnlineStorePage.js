import React, { useState, useEffect } from 'react';
import './OnlineStore.css';
import BarLoader from "react-spinners/BarLoader";
import NoProducts from 'Components/NoProducts/NoProducts';


function OnlineStore({ api }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cakeVariants, setCakeVariants] = useState([]);
  const [selectedCakeVariants, setSelectedCakeVariants] = useState({});

  const [flavors, setFlavors] = useState([]);
  const [selectedFlavor, setSelectedFlavor] = useState({});

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchCakes();

  }, [api]);


  const handleQuantityChange = (productId, action) => {
    const product = products.find((product) => product.id === productId);
    const currentQuantity = quantities[productId];
    const minQuantity = 0;
    let step;

    if (product.product_type === 'Cupcake' && currentQuantity < 12) {
      step = 12; // If current quantity is less than 12 for cupcakes, increase or decrease by 12
    } else {
      step = product.product_type === 'Cupcake' ? 6 : 1;
    }

    let newQuantity;
    if (action === 'increment') {
      newQuantity = currentQuantity + step;
    } else if (action === 'decrement') {
      if (currentQuantity === 12 && product.product_type === 'Cupcake') {
        newQuantity = 0; // If current quantity is 12 for cupcakes, set to 0
      } else {
        newQuantity = Math.max(currentQuantity - step, minQuantity);
      }
    } else {
      return; // Do nothing if action is invalid
    }

    const newQuantities = { ...quantities, [productId]: newQuantity };
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

    const flavor_chose = flavors
      .find((flavor) => flavor.id === parseInt(selectedFlavor[product.id]))
    console.log(flavor_chose)
    console.log(cakeVariant)
    // Retrieve existing cart items or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem('Cart')) || [];

    if (product.product_type === 'Cupcake') {
      // Add the selected cupcake to the cart
      const cartItem = {
        name: product.name + " - " + flavor_chose.name,
        type: 'cupcake',
        price: product.price,
        quantity: quantities[product.id],
        videoId: null,
        cakeId: flavor_chose.product_item
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
        name: product.name +" - " + flavor_chose.name + " - " + cakeVariant.size,
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

  useEffect(() => {
    // Fetch cakes data from the API
    const fetchFlavor = async () => {
      try {
        const response = await api.get("api/flavors/");
    
        setFlavors(response.data);
        
  
      } catch (error) {
        console.error("Error fetching flavors:", error);
      }
      setLoading(false);
    };
    fetchFlavor();

  }, [api]);


  const fetchCakeVariants = async () => {
    try {
      const response = await api.get('api/cakes/');
      setCakeVariants(response.data);

    } catch (error) {
      console.error('Error fetching cake variants:', error);
    }
  };

  useEffect(() => {
    // Fetch cake variants for each cake product
    products.forEach((product) => {
      if (product.product_type === 'Cake') {
        fetchCakeVariants();
      }
    });
  }, [products]);

  return (
    <>
      <h1 className="PageHeader">Online Store</h1>
      {showSuccessMessage && <div className="success-message">Added to cart!</div>}
      <div className='online-store'>

        <BarLoader
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          width={"100%"}
        />

        <div className="cakes-list">

          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <div key={product.id} className="cake-item">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="image"
                  />
                  <br /><br></br>
                  <h3>{product.name}</h3>

                  <p>Flavour:
                    <select
                      id={`type-${product.id}`}
                      onChange={(event) => {
                        const selectedFlavorId = event.target.value;
                        setSelectedFlavor({
                          ...selectedFlavor,
                          [product.id]: selectedFlavorId,
                        });
                        
                      }}
                    >
                      <option disabled selected>
                        Select flavour
                      </option>
                      {flavors
                        .filter((flavor) => flavor.product_item === product.id && flavor.active)
                        .map((flavor) => (
                          <option key={flavor.id} value={flavor.id}>
                            {flavor.name}
                          </option>
                        ))}
                    </select>
                  </p>

                  <p>Type: {product.product_type}</p>
                  {product.product_type === 'Cake' && (
                    <p><div className="quantity-section">
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
                          Select size
                        </option>
                        {cakeVariants
                          .filter((cakeVariant) => {
                            return (
                              cakeVariant.cake === parseInt(selectedFlavor[product.id]) && // Filter by selected flavor
                              cakeVariant.active
                            );
                   
                          })
                          .map((cakeVariant) => (
                            <option key={cakeVariant.id} value={cakeVariant.id}>
                              {cakeVariant.size} - ${cakeVariant.price}
                            </option>
                          ))}
                      </select>
                    </div></p>
                  )}



                  {product.product_type === 'Cupcake' && 
                  <p>Price: ${product.price}</p>}
                  {product.active ? (
                    <div className="quantity-section">
                      <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                      <div className="quantity-control">
                        <button className='quantity-decrease' onClick={() => handleQuantityChange(product.id, 'decrement')}>-</button>
                        <span className="quantity__input"> {quantities[product.id]} </span>
                        <button className='quantity-increase' onClick={() => handleQuantityChange(product.id, 'increment')}>+</button>
                      </div>
                    </div>
                  ) : (
                    <div className="buttons-section">
                      <div className="unavailable-message">
                        THIS ITEM IS UNAVAILABLE
                      </div>
                    </div>
                  )}

                  {product.active && (
                    (product.product_type === 'Cupcake' && quantities[product.id] > 0) && selectedFlavor[product.id]|| (product.product_type === 'Cake' && selectedCakeVariants[product.id] && quantities[product.id] > 0 && selectedFlavor[product.id] ) ? (
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
                  )}
                </div>
              ))}
            </>
          ) : (
            <NoProducts />
          )}
        </div>
      </div>
    </>
  );
}

export default OnlineStore;
