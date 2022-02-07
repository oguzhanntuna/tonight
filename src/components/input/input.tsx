import './Input.scss';

export interface IInputProps {
    label: string;
    type: string;
    value: string;
    onChange: (inputValue: string) => void;
}

const Input = (props: IInputProps): JSX.Element => {
    const { label, type, value, onChange } = props;

    return (
        <div className="input">
            <label>
                {label}
            </label>
            <input 
                type={type} 
                placeholder="Enter"
                onChange={event => onChange(event.target.value)}
                value={value}
                autoComplete='off'
                required
            />
        </div>
    );
}

export default Input