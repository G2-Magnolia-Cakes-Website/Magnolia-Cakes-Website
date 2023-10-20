import React, { useState, useEffect } from 'react';
import './PaymentSuccess.css'
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import { useNavigate } from "react-router-dom";

const SuccessPage = ({ api }) => {
  const [sessionData, setSessionData] = useState(null);
  const [videoItemsJson, setVideoItemsJson] = useState(null);
  const [cakeItemsJson, setCakeItemsJson] = useState(null);
  const [cupcakeItemsJson, setCupcakeItemsJson] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [processed, setProcessed] = useState(false);

  const [videos, setVideoItems] = useState([]);
  const [cakes, setCakeItems] = useState([]);
  const [cupcakes, setCupcakeItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('checkout_session');
    const videoItems = urlParams.get('code');
    setVideoItemsJson(videoItems);  // Store videoItemsJson in state

    const cakeItems = urlParams.get('i');
    setCakeItemsJson(cakeItems);  // Store cakeItemsJson in state

    const cupcakeItems = urlParams.get('x');
    setCupcakeItemsJson(cupcakeItems);  // Store cakeItemsJson in state

    const stripeKey = process.env.REACT_APP_STRIPE_SECRET_KEY;

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

    // Check if purchase is already processed in localStorage
    const isPurchaseProcessed = localStorage.getItem('purchaseProcessed');
    if (isPurchaseProcessed === 'true') {
      setProcessed(true); // Purchase has already been processed
      setPurchased(true); // Purchase has already been processed
    }
  }, [api, setSessionData]);

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
              amount_paid: sessionData.amount_total / 100,
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
      // Mark the purchase as processed in localStorage
      localStorage.setItem('purchaseProcessed', 'true');
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

  useEffect(() => {
    // Fetch the details of video items
    if (videoItemsJson) {
      const videosToPurchase = JSON.parse(videoItemsJson);
      const videoDetailsPromises = videosToPurchase.map((videoId) =>
        fetchVideoDetails(videoId)
      );

      Promise.all(videoDetailsPromises).then((videos) => {
        setVideoItems(videos);
      });
    }

    // Fetch the details of cake items
    if (cakeItemsJson) {
      const cakesToPurchase = JSON.parse(cakeItemsJson);
      const cakeDetailsPromises = cakesToPurchase.map((cakeId) =>
        fetchCakeDetails(cakeId)
      );

      Promise.all(cakeDetailsPromises).then((cakes) => {
        setCakeItems(cakes);
      });
    }

    // Fetch the details of cupcake items
    if (cupcakeItemsJson) {
      const cupcakesToPurchase = JSON.parse(cupcakeItemsJson);
      const cupcakeDetailsPromises = cupcakesToPurchase.map((cupcakeId) =>
        fetchProductDetails(cupcakeId)
      );

      Promise.all(cupcakeDetailsPromises).then((cupcakes) => {
        setCupcakeItems(cupcakes);
      });
    }
  }, [videoItemsJson, cakeItemsJson, cupcakeItemsJson]);

  const fetchVideoDetails = async (videoId) => {
    try {
      const res = await api.get(`/api/videos/${videoId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        return res.data; // Return the video details
      } else {
        console.log(res);
        return null; // Return null if there's an error
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      return null; // Return null if there's an error
    }
  };

  const fetchCakeDetails = async (cakeId) => {
    try {
      const res = await api.get(`/api/cakes/${cakeId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        return res.data; // Return the cake details
      } else {
        console.log(res);
        return null; // Return null if there's an error
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      return null; // Return null if there's an error
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const res = await api.get(`/api/cupcakes/${productId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        return res.data; // Return the product details
      } else {
        console.log(res);
        return null; // Return null if there's an error
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      return null; // Return null if there's an error
    }
  };

  const handleReturnHome = async (e) => {
    navigate('/')
  }

  localStorage.removeItem('Cart');

  return (
    <div className='payment-container'>
      <h1 className='payment-header'>Payment Successful</h1>
      <p className='payment-intro'>Thank you for your purchase! Here are the payment details:</p>
      <div className='payment-details-table-container'>
        <table className='payment-details-table'>
          <thead>
            <tr>
              <th className='type-header'>Item Type</th>
              <th className='type-name'>Item Name</th>
              <th className='type-price'>Item Price</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={`video-${index}`}>
                <td className="item-type">Video</td>
                <td className="item-name">{video.title}</td>
                <td className="item-price">${video.price}</td>
              </tr>
            ))}
            {cakes.map((cake, index) => (
              <tr key={`cake-${index}`}>
                <td className="item-type">Cake</td>
                <td className="item-name">{cake.name}</td>
                <td className="item-price">${cake.price}</td>
              </tr>
            ))}
            {cupcakes.map((cupcake, index) => (
              <tr key={`cupcake-${index}`}>
                <td className="item-type">Cupcake</td>
                <td className="item-name">{cupcake.name}</td>
                <td className="item-price">${cupcake.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='payment-bottom'>
        <div className='payment-return-home'>
          <RoseGoldButton
            onClick={handleReturnHome}
            buttonText="Return Home"
            buttonType="submit"
            height="46px"
          />
        </div>
        <div className='payment-amount'>
          <div className='amount-paid'>
            Total:
          </div>
          <div className='amount-paid-value'>
            ${sessionData ? sessionData.amount_total / 100 : ''}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessPage;