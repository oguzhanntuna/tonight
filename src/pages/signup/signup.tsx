import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './signup.scss';

import * as authActions from '../../store/actions/auth';
import { IInputProps } from '../../components/input/Input';
import { IUserData } from '../../models/interfaces/auth/auth';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Form from '../../components/form/Form';

const SignupPage = (): JSX.Element => {
    const { signup } = authActions;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const signupInputElements: Array<IInputProps> = [
        {
            label: "name",
            type: "text",
            value: username,
            onChange: setUsername
        },
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
        },
        {
            label: "confirm password",
            type: "password",
            value: confirmPassword,
            onChange: setConfirmPassword
        }
    ];

    const handleSignUp = () => {
        if (password === confirmPassword) {
            const userData: IUserData = {
                username,
                email,
                password
            }
    
            dispatch(signup(userData))
            navigate('/');
        }
    }

    return (
        <div className="signupPage">
            <HeroImage imageUrl={heroImage} />
            <div className="signupPage-content">
                <Form 
                    label="Sign Up"
                    inputElements={signupInputElements}
                    includeHelpfulTexts={false}
                    submitButtonLabel="Sign Up"
                    onSubmit={handleSignUp}
                />
            </div>
        </div>
    );
}

export default SignupPage;