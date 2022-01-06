import './login.scss';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Form from '../../components/form/Form';
import { IInputProps } from '../../components/input/Input';

const LoginPage = (): JSX.Element => {
    const loginInputElements: Array<IInputProps> = [
        {
            label: "e-mail", 
            type: "e-mail"
        },
        {
            label: "password",
            type: "password"
        }
    ];

    const handleLogin = () => {
        console.log('login form submitted.');
    }
    
    return (
        <div className="loginPage">
            <HeroImage imageUrl={heroImage} />
            <div className="loginPage-content">
                <Form 
                    label="Login"
                    inputElements={loginInputElements}
                    includeHelpfulTexts={true}
                    submitButtonLabel="Login"
                    onSubmit={() => handleLogin()}
                />
            </div>
        </div>
    );
}

export default LoginPage;