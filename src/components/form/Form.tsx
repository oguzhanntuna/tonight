import { FormEvent } from 'react';
import './Form.scss';

import { useNavigate } from 'react-router-dom';
import Input, { IInputProps } from '../input/Input';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import PrimaryButton from '../primaryButton/primaryButton';

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

    return (
        <form 
            className="form" 
            onSubmit={(event: FormEvent) => handleFormSubmit(event)}
        >
            <div className="form-formLabel">
                {label}
            </div>
            {
                inputElements.map((inputElement, index) => {
                    const { label, type, value, minLength, maxLength, placeholder, onChange } = inputElement;
                    const defaultMinLength = 0;
                    const defaultMaxLength = 524288;
                    const defaultPlaceholder = "Enter"

                    return (
                        <Input 
                            key={index} 
                            label={label}
                            type={type}
                            onChange={onChange}
                            value={value}
                            minLength={minLength ? minLength : defaultMinLength}
                            maxLength={maxLength ? maxLength : defaultMaxLength}
                            placeholder={placeholder ? placeholder : defaultPlaceholder}
                        />
                    );
                })
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
            <PrimaryButton 
                className="form-c2aButton" 
                width="calc(100% - 6rem)"
            >
                {
                    loading 
                        ? 'Loading...' 
                        : submitButtonLabel
                }
            </PrimaryButton>
        </form>
    );
}

export default Form;