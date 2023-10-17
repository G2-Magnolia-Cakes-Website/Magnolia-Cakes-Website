import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./ViewCartPopup.css";
import { Cross } from "hamburger-react";

function ViewCartPopup(props, { api }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const stripePromise = loadStripe(
    "pk_test_51NveKwI2G7Irdjp2nVREupdlFTx5xA6pSo9hJeULztP4rAzUQA7rHzdSPLIUBFfuDtSnzNFq3Zc07hYQ4YIZ0Qkb00sFf0mfSq"
  );

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("Cart")) || []);
  }, [props.trigger]);

  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((item, idx) => idx !== index);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (index, event) => {
    const newCart = [...cartItems];

    // Only allow to change quantiy for non-video product
    if (newCart[index].type === "video") {
      newCart[index].quantity = 1;
    } else {
      newCart[index].quantity = parseInt(event.target.value, 10);
    }

    localStorage.setItem("Cart", JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const handleEmptyCart = () => {
    localStorage.removeItem("Cart");
    setCartItems([]);
  };

  const handleProceedToPayment = async () => {
    const stripe = await stripePromise;

    try {
      // Make the API call to your backend using the provided API function
      const response = await props.api.post("/api/checkout/", {
        amount: totalPrice * 100, // Convert to cents
        items: cartItems,
        email: localStorage.getItem("email"),
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleProceedToPayment();
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="cross">
          <Cross toggled={true} onToggle={() => props.setTrigger(false)} />
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
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(index, event)}
                      className="quantity-input"
                    />
                  </td>
                  <td className="total-price">${item.price * item.quantity}</td>
                  <td className="button-column">
                    <button onClick={() => handleDeleteItem(index)}>
                      Remove
                    </button>
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
  ) : null;
}

export default ViewCartPopup;
