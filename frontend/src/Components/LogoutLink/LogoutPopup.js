import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

function LogoutPopup(props) {

    const navigate = useNavigate();

    // Loading
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Send API msg to backend
        try {
            const token = {
                refresh_token: localStorage.getItem('refresh_token')
            };

            let res = await props.api.post('/api/logout/',
                token,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    withCredentials: true,
                }
            );

            if (res.status === 205) {
                localStorage.clear();
                props.api.defaults.headers.common['Authorization'] = null;

                props.setTrigger(false);

                setLoading(false);

                navigate("/");
                navigate(0);
            } else {
                console.log(res);
            }

        } catch (err) {
            console.error(err);
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
                <br />
                <BarLoader
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
                width={"100%"}
                />
            </div>
        </div>
    ) : "";
}

export default LogoutPopup