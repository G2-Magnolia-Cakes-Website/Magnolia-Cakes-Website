import React, { useState, useEffect } from 'react';


const SuccessPage = ({ api }) => {
  const [sessionData, setSessionData] = useState(null);
  const [videoItemsJson, setVideoItemsJson] = useState(null);
  const [cakeItemsJson, setCakeItemsJson] = useState(null);
  const [cupcakeItemsJson, setCupcakeItemsJson] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('checkout_session');
    const videoItems = urlParams.get('code');
    setVideoItemsJson(videoItems);  // Store videoItemsJson in state

    const cakeItems = urlParams.get('i');
    setCakeItemsJson(cakeItems);  // Store cakeItemsJson in state

    const cupcakeItems = urlParams.get('x');
    setCupcakeItemsJson(cupcakeItems);  // Store cakeItemsJson in state

    const fetchSession = async () => {
      try {
        const response = await api.get(
          `/api/stripe-session/${sessionId}/`,
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
        setSessionData(response.data)
      } catch (error) {
        console.error(`Error fetching session:`, error);
      }
  };

    if (sessionId) {
      fetchSession();

    }
  }, []);
  console.log(sessionData)
  useEffect(() => {
    // For videos, we have videoID only, we need to save for the user: list of video names.
    // For cakes and cupcakes
    // Overall, it would save one purchase as each item purchased, total paid, and date paid 
    if (sessionData && sessionData.payment_status === 'paid' && !processed) {
      const cakesToPurchase = JSON.parse(cakeItemsJson);
      const cupcakesToPurchase = JSON.parse(cupcakeItemsJson);
      const videosToPurchase = JSON.parse(videoItemsJson);
      const purchaseItems = async () => {
          try {
            const response = await api.post(
              `/api/user/purchase/items/`,
              {
                amount_paid: sessionData.amount_total/100,
                cakes: cakesToPurchase,
                cupcakes: cupcakesToPurchase,
                videos: videosToPurchase
              },
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
          } catch (error) {
            console.error(`Error processing purchase:`, error);
          }
      };

      purchaseItems();
      setProcessed(true);
    }
  }, [sessionData])

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