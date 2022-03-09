import { useState } from 'react';
import './Filters.scss';

import { useDeviceType } from '../../../customHooks/useDeviceType';

const EventShowcaseFilters = (): JSX.Element => {
    const deviceType = useDeviceType();
    const daysOfTheWeekArray: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [activeDaysFilter, setActiveDaysFilter] = useState<number>(0);
    
    if (deviceType === 'desktop') {
        
        return (
            <div className="daysOfTheWeekFilters">
                {
                    daysOfTheWeekArray.map((day, index) => (
                        <div 
                            className={`daysOfTheWeekFilters-days ${activeDaysFilter === index ? 'active' : ''}`} 
                            onClick={() => setActiveDaysFilter(index)}
                            key={`${day}-${index}`}
                        >
                            {day}
                        </div>
                    ))
                }
            </div>
        );
    }

    if (deviceType === 'mobile') {
        return (
            <p>Custom Dropdown</p>
        );
    }

    return <></>;
}

export default EventShowcaseFilters;