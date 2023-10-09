import React, { useState, useEffect } from 'react';

const SuccessPage = ({ api }) => {
  const [sessionData, setSessionData] = useState(null);
  const [videoItemsJson, setVideoItemsJson] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('checkout_session');

    const videoItems = urlParams.get('code');
    setVideoItemsJson(videoItems);  // Store videoItemsJson in state

    const stripeKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
    
    // Fetch the session object with the given session id
    const fetchData = async () => {
      try {
        // Stripe's url for session retrieving
        const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${stripeKey}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const session = await response.json();
        setSessionData(session);
      } catch (error) {
        console.error('Error retrieving session object:', error);
      }
    };

    if (sessionId) {
      fetchData();
    }

  }, [api, setSessionData]);

  // Only attempt to unlock the video if everything is valid to prevent user from messing up in the url
  if(sessionData && sessionData.payment_status =="paid"){
    if (videoItemsJson) {
      const videosToPurchase = JSON.parse(videoItemsJson);
      
      videosToPurchase.forEach(async videoId => {
        // Unlock the video for the given user
        await api.post(`/api/user/purchase/video/${videoId}/`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          withCredentials: true,
        })
          .then(data => {
            console.log(`Video ${videoId} purchased:`, data);
          })
          .catch(error => {
            console.error(`Error purchasing video ${videoId}:`, error);
          });
      });
    }
  }
  localStorage.removeItem('Cart')
  return (
    <div>
      <h2>Payment Successful</h2>
      <p>Thank you for your purchase!</p>
    </div>
  );
};

export default SuccessPage;


