import React from 'react'

function LogoutPopup(props) {

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Send API msg to backend
        try {

            const { data } = await
                axios.post('http://localhost:8000/logout/', {
                    refresh_token: localStorage.getItem('refresh_token')
                }, { headers: { 'Content-Type': 'application/json' } },
                    { withCredentials: true });
            localStorage.clear(); 
            axios.defaults.headers.common['Authorization'] = null;


        } catch (err) {
            console.log(err);
        }
    };

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>X</button>
                Are you sure you want to logout?
                <button>Yes</button>
            </div>
        </div>
    ) : "";
}

export default LogoutPopup