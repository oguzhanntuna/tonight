import './Input.scss';

export interface IInputProps {
    label: string;
    type: string;
    value: string;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    onChange: (inputValue: string) => void;
}

const Input = (props: IInputProps): JSX.Element => {
    const { label, type, value, minLength, maxLength, placeholder, onChange } = props;

    return (
        <div className="input">
            <label>
                {label}
            </label>
            <input 
                type={type} 
                placeholder={placeholder}
                onChange={event => onChange(event.target.value)}
                value={value}
                maxLength={maxLength}
                minLength={minLength}
                autoComplete='off'
                required
            />
        </div>
    );
}

export default Input