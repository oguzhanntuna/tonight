import './input.scss';

interface IInputProps {
    label: string;
    type: string;
}

const Input = (props: IInputProps): JSX.Element => {
    const { label, type } = props;

    return (
        <div className={`input input--${label}`}>
            <label>{label}</label>
            <input type={type} placeholder="Enter"/>
        </div>
    );
}

export default Input