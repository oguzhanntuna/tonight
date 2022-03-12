import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './AccountTab.scss';

import * as AuthActions from '../../store/actions/auth';
import { useDeviceType } from '../../customHooks/useDeviceType';

import SettingsDropdown from './SettingsDropdown';
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
    const deviceType = useDeviceType();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);
    const [dropdownItems, setDropdownItems] = useState<Array<IDropdownItems>>([]);

    useEffect(() => {
        const setDropdownItemsAccordingToLabel = () => {
            if (deviceType === 'mobile') {
                setDropdownItems([
                    {
                        label: 'Log Out',
                        onClick: () => dispatch(logout())
                    }
                ]);
            } else {
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
                            label: 'Purchased Tickets',
                            onClick: () => navigate('/purchased-tickets')
                        },
                        {
                            label: 'Log Out',
                            onClick: () => dispatch(logout())
                        }
                    ]);
                }
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
                <SettingsDropdown 
                    dropdownItems={dropdownItems} 
                    setShowSettingsDropdown={setShowProfileDropdown}
                />
            }
        </div>
    );
}

export default AccountTab;