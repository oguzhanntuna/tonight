import { useState } from 'react';
import './signup.scss';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Form from '../../components/form/Form';
import { IInputProps } from '../../components/input/Input';

interface ISignupData {
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupPage = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const signupInputElements: Array<IInputProps> = [
        // {
        //     label: "name",
        //     type: "text"
        // },
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
        const signupData: ISignupData = {
            email,
            password,
            confirmPassword
        }

        console.log(signupData);
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