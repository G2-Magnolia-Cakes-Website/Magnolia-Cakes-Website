import React, { useState, useEffect } from 'react';
import './Workshop.css';
import { useNavigate } from "react-router-dom";
import RoseGoldButton from "Components/RoseGoldButton/RoseGoldButton";

function WorkshopPage({ api }) {

  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);

  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
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
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

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

  const handlePurchaseClick = (videoId) => {
    // Implement the logic to handle the purchase button click
    // This can include redirecting the user to a purchase page or showing a modal
    api.post(`/api/user/purchase/video/${videoId}/`,
      { videoId: videoId },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        // Find the purchased video from the videos state
        const purchasedVideo = videos.find((video) => video.id === videoId);

        if (purchasedVideo) {
          // Add the purchased video to the userVideos state
          setUserVideos((prevUserVideos) => [...prevUserVideos, purchasedVideo]);
        }
      })
      .catch((error) => {
        console.error('Error adding video to user videos:', error);
      });
  };

  return (
    <div>
      <div className="video-container">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <h2 className="video-title">{video.title}</h2>
            <div className='video-or-button'>
              {!hasAccess(video) ? (
                <form onSubmit={() => handlePurchaseClick(video.id)} className='video-purchase-btn'>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkshopPage;
