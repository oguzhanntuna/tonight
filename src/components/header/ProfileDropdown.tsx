import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './ProfileDropdown.scss';

import * as AuthActions from '../../store/actions/auth';
import { useEffect } from 'react';
import { useClickOutside } from '../../customHooks/useClickOutside';

interface IProfileDropdownProps {
    setShowProfileDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropdown = (props: IProfileDropdownProps): JSX.Element => {
    const { setShowProfileDropdown } = props;
    const { logout } = AuthActions;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ref, isClickedOutside } = useClickOutside();
    
    useEffect(() => {
        if (isClickedOutside) {
            setShowProfileDropdown(false);
        }

    }, [isClickedOutside, setShowProfileDropdown]);

    return (
        <div className="profileDropdown" ref={ref}>
            <ul>
                <li onClick={() => navigate('/my-tickets')}>My Tickets</li>
                <li onClick={() => dispatch(logout())}>Logout</li>
            </ul>
        </div>
    );
}

export default ProfileDropdown;

