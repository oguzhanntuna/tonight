import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './AccountTab.scss';

import * as AuthActions from '../../store/actions/auth';
import { useDeviceType } from '../../customHooks/useDeviceType';

import SettingsDropdown from './SettingsDropdown';
import moreIcon from '../../assets/icons/more.svg';
import { IApplicationState } from '../../models/interfaces/store/states/application';

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
    const state = useSelector((state: IApplicationState) => state);
    const { auth: { token: isLoggedIn }, favorites: { favoriteEvents } } = state;
    const favoritesCount = favoriteEvents.length;

    useEffect(() => {
        const setDropdownItemsAccordingToLabel = () => {
            if (isLoggedIn) {
                let dropdownItems: Array<IDropdownItems> = [];
                
                if (deviceType === 'desktop') {
                    dropdownItems = [
                        {
                            label: `Favorites (${favoritesCount})`,
                            onClick: () => navigate('/favorites')
                        },
                        {
                            label: 'Purchased Tickets',
                            onClick: () => navigate('/purchased-tickets')
                        },
                        {
                            label: 'Log Out',
                            onClick: () => dispatch(logout())
                        }
                    ];
                }

                if (deviceType === 'mobile') {
                    dropdownItems = [
                        {
                            label: 'Log Out',
                            onClick: () => dispatch(logout())
                        }
                    ];
                }

                setDropdownItems(dropdownItems);
        
            } else {
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
            }
        }

        setDropdownItemsAccordingToLabel();
    }, [isLoggedIn, deviceType, favoritesCount, dispatch, logout, navigate]);
    
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