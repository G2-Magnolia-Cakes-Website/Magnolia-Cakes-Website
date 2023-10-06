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

  const handlePurchaseClick = async (videoId, videoTitle, videoPrice) => {
    const stripe = await stripePromise;

    try {
      // Make the API call to your backend using the provided API function
      const response = await api.post('/api/checkout/', {
        amount: videoPrice * 100, // Convert to cents
        items: [{
          name: videoTitle,
          price: videoPrice,
          quantity: 1,
        },]
      });

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id, // Use the sessionId from the API response
      });

      // Handle successful purchase
      if (result.error) {
        console.error(result.error.message);
      } else {
        api
          .post(
            `/api/user/purchase/video/${videoId}/`,
            { videoId: videoId },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
            // Find the purchased video from the videos state
            const purchasedVideo = videos.find((video) => video.id === videoId);

            if (purchasedVideo) {
              // Add the purchased video to the userVideos state
              setUserVideos((prevUserVideos) => [...prevUserVideos, purchasedVideo]);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error adding video to user videos:', error);
          });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="video-container">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <h2 className="video-title">{video.title}</h2>
            <div className='video-or-button'>
              {!hasAccess(video) ? (
                <form onSubmit={() => handlePurchaseClick(video.id, video.title, video.price)} className='video-purchase-btn'>
                  <RoseGoldButton
                    buttonText="Purchase Video"
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
