import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./ViewCartPopup.css";
import { Cross } from "hamburger-react";
import { useNavigate } from "react-router-dom";

function ViewCartPopup(props, { api }) {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('Cart')) || []);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const stripePromise = loadStripe('pk_test_51NveKwI2G7Irdjp2nVREupdlFTx5xA6pSo9hJeULztP4rAzUQA7rHzdSPLIUBFfuDtSnzNFq3Zc07hYQ4YIZ0Qkb00sFf0mfSq');
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("Cart")) || []);
  }, [props.trigger]);

  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((item, idx) => idx !== index);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleEmptyCart = () => {
    localStorage.removeItem("Cart");
    setCartItems([]);
  };

  const handleProceedToPayment = async () => {
    if (!localStorage.getItem("access_token")) {
      props.setTrigger(false)
      navigate('/login')
    } else {
      const stripe = await stripePromise;

    try {
      // Make the API call to your backend using the provided API function
      const response = await props.api.post("/api/checkout/", {
        amount: totalPrice * 100, // Convert to cents
        items: cartItems,
        email: localStorage.getItem("email"),
        customer_id: localStorage.getItem("customer_id")
      });

        const result = await stripe.redirectToCheckout({
          sessionId: response.data.id, // Use the sessionId from the API response
        });

        if (result.error) {
          console.error(result.error.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleProceedToPayment();
  };

  // Need to do like this because on mobile view, there is no increment/decrement button for number input
  const handleIncrementQuantity = (index) => {
    const newCart = [...cartItems];
    const item = newCart[index];

    if (item.type === 'cupcake') {
      item.quantity = Math.max(item.quantity + 6, 12); // Increment by 6, minimum 12 for cupcakes
    } else if (item.type !== 'video') {
      item.quantity += 1;
    }

    localStorage.setItem('Cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const handleDecrementQuantity = (index) => {
    const newCart = [...cartItems];
    const item = newCart[index];

    if (item.type === 'cupcake') {
      item.quantity = Math.max(item.quantity - 6, 12); // Decrement by 6, minimum 12 for cupcakes
    } else if (item.type !== 'video' && item.quantity > 1) {
      item.quantity -= 1;
    }

    localStorage.setItem('Cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const handleToggle = (e) => {
    props.setTrigger(false)
  }



  return props.trigger ? (
    <>
      <div className="popup">
        <div className="popup-inner">
          <div className="cross">
            <Cross toggled={true} onToggle={handleToggle} />
          </div>
          {cartItems && cartItems.length > 0 ? (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub-total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className="quantity-control">
                        <button className="quantity-decrease" onClick={() => handleDecrementQuantity(index)}> - </button>
                        <span className="quantity__input"> {item.quantity} </span>

                        <button className="quantity-increase" onClick={() => handleIncrementQuantity(index)}> + </button>
                      </div>
                    </td>
                    <td className='total-price'>${(item.price * item.quantity).toFixed(2)}</td>
                    <td className='button-column'>
                      <button className="remove" onClick={() => handleDeleteItem(index)}>Remove</button>
                    </td>
                  </tr>
                ))}

              </tbody>

              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td className="total-price-cell">${totalPrice}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p>Your cart is empty.</p>
          )}
          {cartItems && cartItems.length > 0 && (
            <div className="button-container">
              <button onClick={() => handleEmptyCart()}>Empty Cart</button>
              <button onClick={() => handleProceedToPayment()}>
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  ) : null;
}

export default ViewCartPopup;
