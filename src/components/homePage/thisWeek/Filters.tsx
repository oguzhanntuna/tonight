import { useState } from 'react';
import './Filters.scss';

const ThisWeekModuleFilters = (): JSX.Element => {
    const daysOfTheWeekArray: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Firday', 'Saturday', 'Sunday'];
    const [activeDaysFilter, setActiveDaysFilter] = useState<number>(0);
    
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

export default ThisWeekModuleFilters;