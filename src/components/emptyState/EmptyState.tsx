import './EmptyState.scss';

interface IEmptyStateProps {
    icon: string;
    text: string
}

const EmptyState = (props: IEmptyStateProps): JSX.Element => {
    const { icon, text } = props;

    return (
        <div className="emptyState">
            <div className="emptyState-icon">
                <img src={icon} alt="emptyState" />
            </div>
            <span className="emptyState-text">
                { text }
            </span>
        </div>
    );
}

export default EmptyState;