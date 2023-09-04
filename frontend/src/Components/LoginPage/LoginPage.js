import './Login.css';
import Form from "./LoginForm"
import magnoliaCakeLogo from "../../utils/Magnolia_Cake_logo.png";
import birthdayCake from "../../utils/carousel-wedding-ann.jpg"

function LoginPage({ api }) {
    const logo = (
        <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
    );

    const image = (
        <img className='login-image' src={birthdayCake} alt='Cake Image' />
    )

    return (
        <div className='white-background'>
            <div className="loginPage">
                <div className='login-form'>
                    <div className='centre-form'>
                        <div className='logo-div'>
                            {logo}
                        </div>
                        <div>
                            <h1 className='login-header'>Log In</h1>
                        </div>
                        <Form api={api} />
                    </div>
                </div>
                {image}
            </div>
        </div>
    );
}

export default LoginPage;