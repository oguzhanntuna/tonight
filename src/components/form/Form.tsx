import { FormEvent } from 'react';
import './Form.scss';

import { useNavigate } from 'react-router-dom';
import Input, { IInputProps } from '../input/Input';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../models/interfaces/store/states/application';

interface IFormProps {
    label: string;
    inputElements: Array<IInputProps>;
    includeHelpfulTexts: boolean;
    submitButtonLabel: string;
    onSubmit: () => void;
}

const Form = (props: IFormProps): JSX.Element => {
    const { label, inputElements, includeHelpfulTexts, submitButtonLabel, onSubmit } = props;
    const authState = useSelector((state: IApplicationState) => state.auth);
    const { loading } = authState;
    const navigate = useNavigate();

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        onSubmit();
    }

    const redirectToSignUpPage = () => { 
        navigate('/signup');
    };

    console.log('loading', loading);

    return (
        <form 
            className="form" 
            onSubmit={(event: FormEvent) => handleFormSubmit(event)}
        >
            <div className="form-formLabel">
                {label}
            </div>
            {
                inputElements.map((inputElement, index) => (
                    <Input 
                        key={index} 
                        label={inputElement.label}
                        type={inputElement.type}
                        onChange={inputElement.onChange}
                        value={inputElement.value}
                    />
                ))
            }
            {
                includeHelpfulTexts &&
                <div className="form-helpfulTexts">
                    <div className="form-rememberMe">
                        Remeber me
                    </div>
                    <div 
                        className="form-alreadyHaveAccount"
                        onClick={() => redirectToSignUpPage()}
                    >
                        Don't have an account
                    </div>
                </div>
            }
            <button className="form-c2aButton">
                {
                    loading 
                        ? 'Loading...' 
                        : submitButtonLabel
                }
            </button>
        </form>
    );
}

export default Form;