import React, { useState, useEffect } from 'react';
import './ViewCartPopup.css';

function ViewCartPopup(props) {
  const [reload, setReload] = useState(false); // State to force reload

  const handleDeleteItem = (index) => {
    const cartItems = JSON.parse(localStorage.getItem('Cart'));
    const updatedCart = cartItems.filter((item, idx) => idx !== index);

    localStorage.setItem('Cart', JSON.stringify(updatedCart));
    setReload((prevReload) => !prevReload);
  };

  const handleQuantityChange = (index, event) => {
    const newCart = JSON.parse(localStorage.getItem('Cart'));
    newCart[index].quantity = parseInt(event.target.value, 10);
    localStorage.setItem('Cart', JSON.stringify(newCart));
    setReload((prevReload) => !prevReload);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setReload((prevReload) => !prevReload);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const cartItems = JSON.parse(localStorage.getItem('Cart'));
  const totalPrice = cartItems ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
  const handleEmptyCart = () => {
    localStorage.removeItem('Cart');
    setReload((prevReload) => !prevReload);
  };
  
  const handleProceedToPayment = () => {
    // Handle the logic for proceeding to payment
    console.log('Proceeding to payment...');
  };
  
  return props.trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => props.setTrigger(false)}>X</button>
        {cartItems && cartItems.length > 0 ? (
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
          
        ) : (
          <p>Your cart is empty.</p>
        )}
        {cartItems && cartItems.length > 0 && (
        <div className='button-container'>
          <button onClick={() => handleEmptyCart()}>Empty Cart</button>
          <button onClick={() => handleProceedToPayment()}>Proceed to Payment</button>
        </div>
      )}
      </div>
    </div>
  ) : null;
}

export default ViewCartPopup;
