import React, { useState, useEffect } from 'react';
import './Workshop.css';
import { useNavigate } from "react-router-dom";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";
import BarLoader from "react-spinners/BarLoader";
import { loadStripe } from '@stripe/stripe-js';

function WorkshopPage({ api }) {

  const navigate = useNavigate();
  const stripePromise = loadStripe('pk_test_51NveKwI2G7Irdjp2nVREupdlFTx5xA6pSo9hJeULztP4rAzUQA7rHzdSPLIUBFfuDtSnzNFq3Zc07hYQ4YIZ0Qkb00sFf0mfSq');

  const [videos, setVideos] = useState([]);

  const [userVideos, setUserVideos] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    } else {
      api
        .get('/api/video/', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setVideos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

      setLoading(true);
      api
        .get('/api/user/videos/', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setUserVideos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user videos:', error);
        });
    }
  }, [api, navigate]);

  const hasAccess = (video) => {
    // Implement your logic to determine if the user has access to the video
    // For example, check if the user's video list contains the video ID
    return userVideos.some((userVideo) => userVideo.id === video.id);
  };

  const handlePurchaseClick = (event, video) => {
    // show a success message or perform any other desired action after copying to the clipboard
    setShowSuccessMessage(true);
    // set a timeout to hide the message after a certain duration
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hide the message after 3 seconds 

    event.preventDefault();
    // Add the selected cake to the cart
    const cartItem = {
      name: video.title,
      type: "video",
      price: video.price,
      quantity: 1,
      videoId: video.id
    };

    // Retrieve existing cart items or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem('Cart')) || [];

    // Check if the item already exists in the cart
    const existingCartItemIndex = existingCart.findIndex(item => item.name === video.title);

    if (existingCartItemIndex === -1) {
      // Item already exists, update its quantity
      existingCart.push(cartItem);

    } else {
      // Item doesn't exist, add it to the cart

    }

    // Store the updated cart in local storage
    localStorage.setItem('Cart', JSON.stringify(existingCart));
  };

  return (
    <div>
      {showSuccessMessage && <div className="success-message">Added to cart!</div>}
      <div className="video-container">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <h2 className="video-title">{video.title}</h2>
            <div className='video-or-button'>
              {!hasAccess(video) ? (
                <form onSubmit={(e) => handlePurchaseClick(e, video)} className='video-purchase-btn'>
                  <RoseGoldButton
                    buttonText="Add to Cart"
                    buttonType="submit"
                    height="36px"
                    margin="auto 0 8px"
                  />
                </form>
              ) : (
                <video controls>
                  <source src={video.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <label className='video-description-label'>Description:</label>
            <p className='video-description'>{video.description}</p>
            {video.price}
          </div>
        ))}
      </div>
      <BarLoader
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={"100%"}
      />
    </div>
  );
}

export default WorkshopPage;
