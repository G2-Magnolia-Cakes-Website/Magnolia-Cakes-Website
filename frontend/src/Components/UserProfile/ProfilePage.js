import './ProfilePage.css';
// import Form from "./LoginForm"
import React from 'react';

function ProfilePage({ api }) {

    return (
        <div>
            <div className='white-background'>
                <div className='login-form'>
                    <div className='centre-form'>
                        <div>
                            <h1 className='login-header'>Account Settings</h1>
                        </div>
                        {/* <Form api={api} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;