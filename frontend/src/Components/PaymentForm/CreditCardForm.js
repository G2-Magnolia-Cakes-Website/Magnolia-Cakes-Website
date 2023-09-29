import React from 'react';

const CreditCardForm = () => {
  return (
    <div className="credit-card-form">
      <label htmlFor="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" placeholder="Enter card number" />

      <label htmlFor="expirationDate">Expiration Date:</label>
      <input type="text" id="expirationDate" placeholder="MM/YYYY" />

      <label htmlFor="cvv">CVV:</label>
      <input type="text" id="cvv" placeholder="Enter CVV" />
    </div>
  );
};

export default CreditCardForm;