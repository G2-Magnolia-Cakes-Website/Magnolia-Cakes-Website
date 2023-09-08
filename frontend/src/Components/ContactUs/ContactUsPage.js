import React from 'react';
import './ContactUs.css';
import Form from "./ContactUsForm"

function SignupPage({ api }) {

    return (
        <div className="ContactUsPage">
            <div className='contact-form'>
                <div>
                    <h1 className='contact-header'>Contact Us</h1>
                </div>
                <Form api={api} />
            </div>
        </div>
    );
}

export default SignupPage;