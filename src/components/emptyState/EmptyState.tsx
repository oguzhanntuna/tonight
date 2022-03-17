import { useNavigate } from 'react-router-dom';
import './EmptyState.scss';

import { useLoggedIn } from '../../customHooks/useLoggedIn';
import { useDeviceType } from '../../customHooks/useDeviceType';

import PrimaryButton from '../primaryButton/primaryButton';

interface IEmptyStateProps {
    icon: string;
    text: string
}

const EmptyState = (props: IEmptyStateProps): JSX.Element => {
    const { icon, text } = props;
    const navigate = useNavigate();
    const deviceType = useDeviceType();
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
                <PrimaryButton 
                    className="emptyState-redirectButton"
                    width={deviceType === 'desktop' ? '20rem' : '16rem'}
                    onClick={() => navigate('/login')}
                >
                    Log In
                </PrimaryButton>
            }
        </div>
    );
}

export default EmptyState;