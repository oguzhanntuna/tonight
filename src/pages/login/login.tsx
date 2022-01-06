import './login.scss';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Form from '../../components/form/Form';
import { IInputProps } from '../../components/input/Input';
import { useState } from 'react';

interface ILoginData {
    email: string;
    password: string;
}

const LoginPage = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const loginInputElements: Array<IInputProps> = [
        {
            label: "e-mail", 
            type: "e-mail",
            value: email,
            onChange: setEmail
        },
        {
            label: "password",
            type: "password",
            value: password,
            onChange: setPassword
        }
    ];

    const handleLogin = () => {
        const loginData: ILoginData = {
            email,
            password
        }
        console.log(loginData);
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
                    onSubmit={handleLogin}
                />
            </div>
        </div>
    );
}

export default LoginPage;