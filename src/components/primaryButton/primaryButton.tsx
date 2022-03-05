import './primaryButton.scss';

interface IPrimaryButtonProps {
    className?: string;
    width?: string;
    children: JSX.Element | string;
    disabled?: boolean;
    onClick?: () => void;
}

const PrimaryButton = (props: IPrimaryButtonProps) => {
    const { 
        className,
        width = '100%', 
        children, 
        disabled,
        onClick 
    } = props;

    return (
        <button 
            className={`
                primaryButton 
                ${className ? className : ''}
            `}
            style={{ width }}
            disabled={disabled ? disabled : false}
            onClick={onClick}
        >
            { children }    
        </button>
    );
}

export default PrimaryButton;