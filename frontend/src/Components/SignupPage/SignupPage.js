import './Signup.css';
import Form from "./SignupForm"
import { useState } from 'react';

function SignupPage() {

    const [response, setResponse] = useState('');
    const [failMessage, setError] = useState('');

    const result = (result) => {
        setResponse(result);
    }

    const test = (failMessage) => {
        setError(failMessage);
    }

    return (
        <div className="SignupPage">
            <div className='white-box'>
                <h1 className='signup-header'>Sign Up</h1>
            </div>
            <div className='white-box'>
                <Form result={result} failMessage={test} />
            </div>
            <div className='white-box'>
                {response}
            </div>
            <div className='white-box'>
                {failMessage}
            </div>
        </div>
    );
}

export default SignupPage;