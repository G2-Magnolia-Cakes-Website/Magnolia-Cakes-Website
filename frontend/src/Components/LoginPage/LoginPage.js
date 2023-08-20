import './Login.css';
import Form from "./LoginForm"

function LoginPage() {

    return (
        <div className="SignupPage">
            <div className='white-box'>
                <h1 className='signup-header'>Sign Up</h1>
            </div>
            <div className='white-box'>
                <Form />
            </div>
        </div>
    );
}

export default LoginPage;