import './spinner.scss';

interface ISpinnerProps {
    width?: string;
    height?: string;
    borderWidth?: string;
    borderBottomColor?: string;
}

const Spinner = (props: ISpinnerProps): JSX.Element => {
    const { 
        width = '4rem', 
        height = '4rem', 
        borderWidth = '1rem',
        borderBottomColor =  '#FFFFFF'
    } = props;

    return (
        <div 
            className="spinner" 
            style={{ 
                width,
                height, 
                borderWidth,
                borderBottomColor
            }}
        />
    )
}     

export default Spinner;