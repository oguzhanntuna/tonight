import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './EmptyState.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

interface IEmptyStateProps {
    icon: string;
    text: string
}

const EmptyState = (props: IEmptyStateProps): JSX.Element => {
    const { icon, text } = props;
    const navigate = useNavigate();
    const isLoggedin = useSelector((state: IApplicationState) => state.auth.token);

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