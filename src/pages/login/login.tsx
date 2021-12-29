import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Input from '../../components/input/input';



const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();

    const handleLogin = (event: FormEvent) => {
        event.preventDefault()

        console.log('form submitted.');
    }
    
    return (
        <div className="loginPage">
            <HeroImage imageUrl={heroImage} />
            <div className="loginPage-content">
                <form 
                    className="loginPage-form" 
                    onSubmit={(event: FormEvent) => handleLogin(event)}
                >
                    <div className="loginPage-formLabel">
                        Login
                    </div>
                    <Input 
                        label="e-mail" 
                        type="e-mail" 
                    />
                    <Input 
                        label="password" 
                        type="password" 
                    />
                    <div className="loginPage-helpfulTexts">
                        <div className="loginPage-rememberMe">
                            Remeber me
                        </div>
                        <div 
                            className="loginPage-alreadyHaveAccount"
                            onClick={() => navigate('/signup')}
                        >
                            Don't have an account
                        </div>
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;