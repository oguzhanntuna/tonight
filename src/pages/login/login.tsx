import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './login.scss';

import * as authActions from '../../store/actions/auth';
import { useLoggedIn } from '../../customHooks/useLoggedIn';
import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { IInputProps } from '../../components/input/input';
import { ILoginData } from '../../models/interfaces/auth/auth';

import heroImage from '../../assets/hero.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Form from '../../components/form/Form';


const LoginPage = (): JSX.Element => {
    const { login } = authActions;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedin = useLoggedIn();
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
            minLength: 8,
            onChange: setPassword
        }
    ];

    useScrollToTop();

    useEffect(() => {
        if (isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin, navigate]);

    const handleLogin = async () => {
        const loginData: ILoginData = {
            email,
            password
        }

        dispatch(login(loginData));
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