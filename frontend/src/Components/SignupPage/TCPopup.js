import React, { useEffect, useState } from 'react'
import './TCPopup.css'

function Popup(props) {

  const [content, setContent] = useState('');

  useEffect(() => {
    // Make a GET request using the passed api instance
    props.api.get('/api/terms-and-conditions/')
      .then(response => {
        // Set the retrieved content in the state
        setContent(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [props.api]);

  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => props.setTrigger(false)}>X</button>
        {content}
      </div>
    </div>
  ) : "";
}

export default Popup
