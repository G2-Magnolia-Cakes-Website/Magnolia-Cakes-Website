import './Login.css';
import Form from "./LoginForm"

function LoginPage() {

    return (
        <div className="loginPage">
            <div className='login-form'>
                <div className='logo-div'>
                    <img src='../../utils/Magnolia_Cake_logo.png' alt="Logo" />
                </div>
                <div>
                    <h1 className='login-header'>Log In</h1>
                </div>
                <Form />
            </div>
            <div className='login-image'>
                {/* Large image on left */}
                img
            </div>
        </div>
    );
}

export default LoginPage;