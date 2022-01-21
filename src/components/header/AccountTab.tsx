import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './AccountTab.scss';

import * as AuthActions from '../../store/actions/auth';

import AccountDropdown from './AccountDropdown';
import moreIcon from '../../assets/icons/more.svg';

export interface IDropdownItems {
    label: string;
    onClick: () => void;
}

interface IAccountTabProps {
    tabLabel?: string;
}

const AccountTab = (props: IAccountTabProps): JSX.Element => {
    const { tabLabel = 'My Account' } = props;
    const { logout } = AuthActions;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);
    const [dropdownItems, setDropdownItems] = useState<Array<IDropdownItems>>([]);

    useEffect(() => {
        const setDropdownItemsAccordingToLabel = () => {
            if (tabLabel === 'My Account') {
    
                setDropdownItems([
                    {
                        label: 'Log In',
                        onClick: () => navigate('/login')
                    },
                    {
                        label: 'Sign Up',
                        onClick: () => navigate('/signup')
                    }
                ]);
            } else {
    
                setDropdownItems([
                    {
                        label: 'My Tickets',
                        onClick: () => navigate('/my-tickets')
                    },
                    {
                        label: 'Log Out',
                        onClick: () => dispatch(logout())
                    }
                ]);
            }
        }

        setDropdownItemsAccordingToLabel();

    }, [tabLabel, dispatch, logout, navigate]);
    
    const toggleProfileDropdown = (): void => {

        setShowProfileDropdown(prevState => !prevState);
    }

    const capitalizeFirstLetter = (word: string): string => {

        return word.charAt(0).toUpperCase() + word.slice(1);
    } 

    return (
        <div 
            className="accountTab"
            onClick={() => toggleProfileDropdown()}
        >
            <div className="accountTabContainer">
                <span className="accountTabContainer-username">
                    { capitalizeFirstLetter(tabLabel) }
                </span>
                <div className={`accountTabContainer-moreIcon ${showProfileDropdown ? 'active' : '' }`}>
                    <img src={moreIcon} alt="more" />
                </div>
            </div>
            { 
                showProfileDropdown && 
                <AccountDropdown 
                    dropdownItems={dropdownItems} 
                    setShowAccountDropdown={setShowProfileDropdown}
                />
            }
        </div>
    );
}

export default AccountTab;