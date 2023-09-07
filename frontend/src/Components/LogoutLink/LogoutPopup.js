import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutPopup(props) {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send API msg to backend
        try {

            const token = {
                refresh_token: localStorage.getItem('refresh_token')
            };
            let access = localStorage.getItem('access_token');

            let res = await axios.post('http://localhost:8000/api/logout/',
                JSON.stringify(token),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                },
                { withCredentials: true }
            );

            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;

            props.setTrigger(false)

            navigate("/");
            navigate(0);

        } catch (err) {
            console.log(err);
        }
    };

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>X</button>
                Are you sure you want to logout?
                <div>
                    <button className='cancel-btn' onClick={() => props.setTrigger(false)}>Cancel</button>
                    <button className='yes-btn' onClick={handleSubmit}>Yes</button>
                </div>
            </div>
        </div>
    ) : "";
}

export default LogoutPopup