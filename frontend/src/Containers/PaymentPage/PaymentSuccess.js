import React, { useState, useEffect } from 'react';

const SuccessPage = ({ api }) => {
  const [sessionData, setSessionData] = useState(null);
  const [videoItemsJson, setVideoItemsJson] = useState(null);
  const [purchased, setPurchased] = useState(false); // Flag variable

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('checkout_session');

    const videoItems = urlParams.get('code');
    setVideoItemsJson(videoItems);  // Store videoItemsJson in state

    const stripeKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
    console.log(stripeKey)
    // Fetch the session object with the given session id
    const fetchData = async () => {
      try {
        // Stripe's url for session retrieving
        const response = await fetch(
          `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${stripeKey}`
            }
          }
        );

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

  useEffect(() => {
    if (sessionData && sessionData.payment_status === 'paid' && videoItemsJson && !purchased) {
      const videosToPurchase = JSON.parse(videoItemsJson);

      if (localStorage.getItem('access_token')) {
        const purchaseVideos = async () => {
          for (const videoId of videosToPurchase) {
            try {
              const response = await api.post(
                `/api/user/purchase/video/${videoId}/`,
                {},
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(
                      'access_token'
                    )}`
                  },
                  withCredentials: true
                }
              );
              console.log(`Video ${videoId} purchased:`, response.data);
            } catch (error) {
              console.error(`Error purchasing video ${videoId}:`, error);
            }
          }
        };

        purchaseVideos();
        setPurchased(true); // Set the flag variable to true
      }
    }
  }, [api, sessionData, videoItemsJson, purchased]);

  localStorage.removeItem('Cart');

  return (
    <div>
      <h2>Payment Successful</h2>
      <p>Thank you for your purchase!</p>
    </div>
  );
};

export default SuccessPage;