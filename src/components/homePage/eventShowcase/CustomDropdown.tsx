import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './CustomDropdown.scss';

import { useClickOutside } from '../../../customHooks/useClickOutside';
import { IDropdownItem } from './Filters';

import moreIcon from '../../../assets/icons/more.svg'
import { useDeviceType } from '../../../customHooks/useDeviceType';

interface ICustomDropdown {
    items: Array<IDropdownItem>;
    activeDropdown: IDropdownItem;
    setActiveDropdown: Dispatch<SetStateAction<IDropdownItem>>;
}

const CustomDropdown = (props: ICustomDropdown) => {
    const { items, activeDropdown, setActiveDropdown } = props;
    const deviceType = useDeviceType();
    const [showOptions, setShowOptitons] = useState<boolean>(false);
    const { ref, isClickedOutside } = useClickOutside();

    const toggleDropdown = () => setShowOptitons(prevShowOptionsState => !prevShowOptionsState);

    useEffect(() => {
        if (isClickedOutside) {
            setShowOptitons(false);
        }
    }, [deviceType, isClickedOutside]);

    const selectActiveDropdown = (item: IDropdownItem) => {
        setActiveDropdown(item);
        toggleDropdown();
    }

    return (
        <div className={`dropdown ${showOptions ? 'dropdown--active' : ''}`} ref={ref} >
            <div 
                className="dropdown-placeholder"
                onClick={() => toggleDropdown()}
            >
                <p>{activeDropdown && activeDropdown.name}</p>
                <div className={`dropdown-moreIcon ${showOptions ? 'active' : '' }`}>
                    <img src={moreIcon} alt="more" />
                </div>
            </div>
            {
                showOptions &&
                <div className='dropdown-options'>
                    {
                        items.map((item, index) => (
                            <div 
                                key={`${index}-${item.value}`} 
                                className={`dropdown-option ${activeDropdown?.value === item.value ? 'active' : '' }`} 
                                onClick={() => selectActiveDropdown(item)}
                            >
                                { item.name }
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default CustomDropdown;