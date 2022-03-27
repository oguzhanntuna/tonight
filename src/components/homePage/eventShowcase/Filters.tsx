import { useState } from 'react';
import './Filters.scss';

import { useDeviceType } from '../../../customHooks/useDeviceType';

import CustomDropdown from './CustomDropdown';

export interface IDropdownItem {
    name: string;
    value: string;
}

const EventShowcaseFilters = (): JSX.Element => {
    const deviceType = useDeviceType();
    const [activeDay, setActiveDay] = useState<IDropdownItem | null>(null);
    const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
    const [dayOfTheWeekFilters] = useState<Array<IDropdownItem>>([
        {
            name: "Monday",
            value: "monday"
        },
        {
            name: "Tuesday",
            value: "tuesday"
        },
        {
            name: "Wednesday",
            value: "wednesday"
        },
        {
            name: "Thursday",
            value: "thursday"
        },
        {
            name: "Friday",
            value: "friday"
        },
        {
            name: "Saturday",
            value: "saturday"
        },
        {
            name: "Sunday",
            value: "sunday"
        },
    ])
    
    if (deviceType === 'desktop') {
        
        return (
            <div className="daysOfTheWeekFilters">
                {
                    dayOfTheWeekFilters.map((day, index) => (
                        <div 
                            className={`daysOfTheWeekFilters-days ${activeDayIndex === index ? 'active' : ''}`} 
                            onClick={() => setActiveDayIndex(index)}
                            key={`${day.value}-${index}`}
                        >
                            {day.name}
                        </div>
                    ))
                }
            </div>
        );
    }

    if (deviceType === 'mobile') {
        return (
            <CustomDropdown 
                items={dayOfTheWeekFilters} 
                activeDropdown={activeDay}
                setActiveDropdown={setActiveDay}
            />
        );
    }

    return <></>;
}

export default EventShowcaseFilters;