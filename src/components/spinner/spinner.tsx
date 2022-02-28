import './spinner.scss';

interface ISpinnerProps {
    width?: string;
    height?: string;
    borderWidth?: string;
}

const Spinner = (props: ISpinnerProps): JSX.Element => {
    const { width = '4rem', height = '4rem', borderWidth = '1rem' } = props;

    return (
        <div 
            className="spinner" 
            style={{ 
                width: width, 
                height: height, 
                borderWidth: borderWidth
            }}
        />
    )
}     

export default Spinner;