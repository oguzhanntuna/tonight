import { useState } from 'react';
import './ProfileTab.scss';

import ProfileDropdown from './ProfileDropdown';
import moreIcon from '../../assets/icons/more.svg';

interface IProfileTabProps {
    activeUsername: string;
}

const ProfileTab = (props: IProfileTabProps): JSX.Element => {
    const { activeUsername } = props;
    const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);

    const toggleProfileDropdown = (): void => {

        setShowProfileDropdown(prevState => !prevState);
    }

    const capitalizeFirstLetter = (word: string): string => {

        return word.charAt(0).toUpperCase() + word.slice(1);
    } 

    return (
        <div className="profileTab" onClick={() => toggleProfileDropdown()}>
            <span className="profileTab-username">
                {capitalizeFirstLetter(activeUsername)}
            </span>
            <div className="profileTab-moreIcon">
                <img src={moreIcon} alt="more" />
            </div>
            { 
                showProfileDropdown && 
                <ProfileDropdown setShowProfileDropdown={setShowProfileDropdown} />
            }
        </div>
    );
}

export default ProfileTab;