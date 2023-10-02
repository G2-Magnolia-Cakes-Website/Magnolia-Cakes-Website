import React, { useState, useEffect } from 'react';
import './Payment.css';
import { loadStripe } from '@stripe/stripe-js';

function Payment({api}) {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('Cart')) || []);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const stripePromise = loadStripe('pk_test_51NveKwI2G7Irdjp2nVREupdlFTx5xA6pSo9hJeULztP4rAzUQA7rHzdSPLIUBFfuDtSnzNFq3Zc07hYQ4YIZ0Qkb00sFf0mfSq');

  const F_fixed = 0.30;  // Fixed fee after VAT/GST is included
  const F_percent = 0.0175;  // Percent fee after VAT/GST is included
  const totalCharges = (totalPrice + F_fixed) / (1 - F_percent);
  const serviceFees = totalCharges - totalPrice;

  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((item, idx) => idx !== index);
    localStorage.setItem('Cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (index, event) => {
    const newCart = [...cartItems];
    newCart[index].quantity = parseInt(event.target.value, 10);
    localStorage.setItem('Cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const handleEmptyCart = () => {
    localStorage.removeItem('Cart');
    setCartItems([]);
  };

  const handleProceedToPayment = async () => {
    const stripe = await stripePromise;
  
    try {
      // Make the API call to your backend using the provided API function
      const response = await api.post('/api/checkout/', {
        amount: (totalPrice+serviceFees) * 100, // Convert to cents
        items: cartItems,
      });
  
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id, // Use the sessionId from the API response
      });
  
      if (result.error) {
        console.error(result.error.message);
      } else {


        // Fetch payment success URL using API
        await api.get('/api/payment_success/');
        // Payment was successful, display an alert
        alert('Payment successful!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    handleProceedToPayment();
  };
  
  

  return (
    <div className='payment-page'>
      {cartItems.length > 0 ? (
        <form className="payment-content" onSubmit={handleSubmit}>

          <table className='cart-table'>
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
                      type='number'
                      min='1'
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(index, event)}
                      className='quantity-input'
                    />
                  </td>
                  <td className='total-price'>${item.price * item.quantity}</td>
                  <td className='button-column'>
                    <button onClick={() => handleDeleteItem(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>

             <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td>Service Fees:</td>
                <td className='total-price-cell'>${serviceFees.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Total:</td>
                <td className='total-price-cell'>${(totalCharges).toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className='button-container'>
          <button onClick={() => handleEmptyCart()}>Empty Cart</button>
          <button onClick={() => handleProceedToPayment()}>Proceed to Payment</button>
        </div>
          
        </form>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Payment;
