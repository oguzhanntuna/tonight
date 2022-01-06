import './signup.scss';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import Form from '../../components/form/Form';
import { IInputProps } from '../../components/input/Input';

const SignupPage = (): JSX.Element => {
    const loginInputElements: Array<IInputProps> = [
        {
            label: "name",
            type: "text"
        },
        {
            label: "e-mail", 
            type: "e-mail"
        },
        {
            label: "password",
            type: "password"
        },
        {
            label: "confirm password",
            type: "password"
        }
    ];

    const handleSignUp = () => {
        console.log('sign up form submitted.');
    }

    return (
        <div className="signupPage">
            <HeroImage imageUrl={heroImage} />
            <div className="signupPage-content">
                <Form 
                    label="Sign Up"
                    inputElements={loginInputElements}
                    includeHelpfulTexts={false}
                    submitButtonLabel="Sign Up"
                    onSubmit={() => handleSignUp()}
                />
            </div>
        </div>
    );
}

export default SignupPage