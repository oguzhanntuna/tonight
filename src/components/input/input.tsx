import './Input.scss';

export interface IInputProps {
    label: string;
    type: string;
}

const Input = (props: IInputProps): JSX.Element => {
    const { label, type } = props;

    return (
        <div className="input">
            <label>{label}</label>
            <input type={type} placeholder="Enter"/>
        </div>
    );
}

export default Input