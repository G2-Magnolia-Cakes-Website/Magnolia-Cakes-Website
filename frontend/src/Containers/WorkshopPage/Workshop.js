import React, { useState, useEffect } from 'react';
import './Workshop.css';
import { useNavigate } from "react-router-dom";

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
    console.log(`Purchase video with ID: ${videoId}`);
  };

  return (
    <div>
      <div className="video-container">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <h2 className="video-title">{video.title}</h2>
            {!hasAccess(video) ? (
              <div>
                <button onClick={() => handlePurchaseClick(video.id)}>Purchase Video</button>
              </div>
            ) : (
              <video controls>
                <source src={video.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkshopPage;
