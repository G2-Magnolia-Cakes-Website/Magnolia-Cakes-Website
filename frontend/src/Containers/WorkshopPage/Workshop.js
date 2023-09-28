import React, { useState, useEffect } from 'react';
import './Workshop.css';

function WorkshopPage({ api }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api
      .get("/api/video/")
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div>
      <div className="video-container">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <h2 className='video-title'>{video.title}</h2>
            <video controls>
              <source src={video.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkshopPage;
