import React, { useEffect } from 'react';
import './ImagePopup.css';

function ImagePopup(props) {


  return props.trigger ? (
    <div className='image-popup' onClick={() => props.setTrigger(false)}>
      <div className='image-popup-inner'>
        <button className='image-close-btn' onClick={() => props.setTrigger(false)}>X</button>
        <img src={props.imageData.image} alt={props.imageData.title} id='image-popup-img' />
      </div>
    </div>
  ) : null;
}

export default ImagePopup;
