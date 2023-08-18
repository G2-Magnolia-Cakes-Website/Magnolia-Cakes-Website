import React from 'react'
import './Popup.css'
import TermsAndConditionsTest from './TermsAndConditionsTest'

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={() => props.setTrigger(false)}>X</button>
            <TermsAndConditionsTest />
        </div>
    </div>
  ) : "";
}

export default Popup
