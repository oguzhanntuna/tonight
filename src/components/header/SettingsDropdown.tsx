import { useClickOutside } from '../../customHooks/useClickOutside';
import { useEffect } from 'react';
import './SettingsDropdown.scss';

import { IDropdownItems } from './AccountTab';

interface ISettingsDropdownProps {
    dropdownItems: Array<IDropdownItems>;
    setShowSettingsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsDropdown = (props: ISettingsDropdownProps): JSX.Element => {
    const { dropdownItems, setShowSettingsDropdown } = props;
    const { ref, isClickedOutside } = useClickOutside();
    
    useEffect(() => {
        if (isClickedOutside) {
            setShowSettingsDropdown(false);
        }

    }, [isClickedOutside, setShowSettingsDropdown]);

    return (
        <div className="settingsDropdown" ref={ref}>
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

export default SettingsDropdown;

