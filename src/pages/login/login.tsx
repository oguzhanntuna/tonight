import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.scss';

import { IInputProps } from '../../components/input/Input';
import { ILoginData } from '../../models/interfaces/auth/auth';
import * as authActions from '../../store/actions/auth';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Form from '../../components/form/Form';

const LoginPage = (): JSX.Element => {
    const { login } = authActions;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const loginInputElements: Array<IInputProps> = [
        {
            label: "e-mail", 
            type: "email",
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

    const handleLogin = async () => {
        const loginData: ILoginData = {
            email,
            password
        }

        dispatch(login(loginData));
        // navigate('/');
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