import { Dispatch, useState } from 'react';
import './Filters.scss';

import { useDeviceType } from '../../../customHooks/useDeviceType';

import CustomDropdown from './CustomDropdown';

export interface IDropdownItem {
    name: string;
    value: string;
}

interface IEventShowcaseFiltersProps {
    activeDayFilter: IDropdownItem;
    setActiveDayFilter: Dispatch<React.SetStateAction<IDropdownItem>>;
}

const EventShowcaseFilters = (props: IEventShowcaseFiltersProps): JSX.Element => {
    const { activeDayFilter, setActiveDayFilter } = props;
    const deviceType = useDeviceType();
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
                            className={`daysOfTheWeekFilters-days ${activeDayFilter.value === day.value ? 'active' : ''}`} 
                            onClick={() => setActiveDayFilter(day)}
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
                activeDropdown={activeDayFilter}
                setActiveDropdown={setActiveDayFilter}
            />
        );
    }

    return <></>;
}

export default EventShowcaseFilters;