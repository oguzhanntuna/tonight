import { useState } from 'react';
import './signup.scss';

import * as authActions from '../../store/actions/auth';
import { IUserData } from '../../models/interfaces/signup/userData';
import { IInputProps } from '../../components/input/Input';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Form from '../../components/form/Form';
import { useDispatch } from 'react-redux';

const SignupPage = (): JSX.Element => {
    const { signUp } = authActions;
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const dispatch = useDispatch();
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
            const signupData: IUserData = {
                username,
                email,
                password
            }
    
            dispatch(signUp(signupData));
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