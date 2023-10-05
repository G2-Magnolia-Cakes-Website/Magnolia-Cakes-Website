import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Display an alert indicating a successful payment
    alert('Payment successful! Please check your email for payment invoice.');

    // Clear cart items from local storage
    localStorage.removeItem('Cart');

    // Immediately navigate to the homepage
    navigate('/');
  }, [navigate]);

  return (
    <div></div>
  );
};

export default SuccessPage;
