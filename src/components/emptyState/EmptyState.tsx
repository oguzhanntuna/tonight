import { useNavigate } from 'react-router-dom';
import './EmptyState.scss';

import { useLoggedIn } from '../../customHooks/useLoggedIn';

interface IEmptyStateProps {
    icon: string;
    text: string
}

const EmptyState = (props: IEmptyStateProps): JSX.Element => {
    const { icon, text } = props;
    const navigate = useNavigate();
    const isLoggedin = useLoggedIn();

    return (
        <div className="emptyState">
            <div className="emptyState-icon">
                <img src={icon} alt="emptyState" />
            </div>
            <span className="emptyState-text">
                { 
                    isLoggedin
                        ? text
                        : "You need to log in first!"
                }
            </span>
            {
                !isLoggedin &&
                <button 
                    className="emptyState-redirectButton"
                    onClick={() => navigate('/login')}
                >
                    Log In
                </button>
            }
        </div>
    );
}

export default EmptyState;