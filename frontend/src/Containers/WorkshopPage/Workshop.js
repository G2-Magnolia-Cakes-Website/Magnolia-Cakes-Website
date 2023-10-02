import React, { useState, useEffect } from 'react';
import './Workshop.css';
import BarLoader from "react-spinners/BarLoader";

function WorkshopPage({ api }) {
  const [videos, setVideos] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/video/")
      .then((response) => {
        setVideos(response.data);
        setLoading(false);
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
