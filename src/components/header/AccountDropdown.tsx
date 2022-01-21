import './AccountDropdown.scss';

import { IDropdownItems } from './AccountTab';
import { useEffect } from 'react';
import { useClickOutside } from '../../customHooks/useClickOutside';

interface IAccountDropdownProps {
    dropdownItems: Array<IDropdownItems>;
    setShowAccountDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountDropdown = (props: IAccountDropdownProps): JSX.Element => {
    const { dropdownItems, setShowAccountDropdown } = props;
    const { ref, isClickedOutside } = useClickOutside();
    
    useEffect(() => {
        if (isClickedOutside) {
            setShowAccountDropdown(false);
        }

    }, [isClickedOutside, setShowAccountDropdown]);

    return (
        <div className="accountDropdown" ref={ref}>
            <ul>
                {
                    dropdownItems.map((item, index) => (
                        <li 
                            key={`${item.label}-${index}`} 
                            onClick={() => item.onClick()}
                        >
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default AccountDropdown;

