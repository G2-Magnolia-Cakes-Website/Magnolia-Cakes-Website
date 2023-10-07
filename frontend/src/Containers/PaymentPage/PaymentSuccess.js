import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = ({api}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Display an alert indicating a successful payment
    alert('Payment successful! Please check your email for payment invoice.');

    // Clear cart items from local storage
    localStorage.removeItem('Cart');

    api.post('/api/user/purchase/success/',
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      withCredentials: true,
    })

    // Immediately navigate to the homepage
    navigate('/');
  }, [navigate]);

  return (
    <div></div>
  );
};

export default SuccessPage;
