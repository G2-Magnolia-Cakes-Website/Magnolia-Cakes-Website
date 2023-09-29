import React, { useState, useEffect } from 'react';
import './Payment.css';
import CreditCardForm from 'Components/PaymentForm/CreditCardForm';

function Payment() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('Cart')) || []);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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

  const handleProceedToPayment = () => {
    // Handle the logic for proceeding to payment
    console.log('Proceeding to payment...');
  };

  return (
    <div className='payment-page'>
      {cartItems.length > 0 ? (
        <div className="payment-content">
          <CreditCardForm />
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
                <td>Total:</td>
                <td className='total-price-cell'>${totalPrice}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {cartItems.length > 0 && (
        <div className='button-container'>
          <button onClick={() => handleEmptyCart()}>Empty Cart</button>
          <button onClick={() => handleProceedToPayment()}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
}

export default Payment;
