import './Login.css';
import Form from "./LoginForm"
import magnoliaCakeLogo from "../../utils/Magnolia_Cake_logo.png";
import birthdayCake from "../../utils/carousel-wedding-ann.jpg"

function LoginPage() {
    const logo = (
        <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
    );

    const image = (
        <img className='login-image' src={birthdayCake} alt='Cake Image' />
    )

    return (
        <div className="loginPage">
            <div className='login-form'>
                <div className='logo-div'>
                    {logo}
                </div>
                <div>
                    <h1 className='login-header'>Log In</h1>
                </div>
                <Form />
            </div>
            {image}
        </div>
    );
}

export default LoginPage;