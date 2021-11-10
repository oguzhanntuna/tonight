import { useState, useEffect } from 'react';
import './ThisWeekModule.scss';

import image from '../../../assets/Screen Shot 2021-11-09 at 4.19.30 PM.png';
import moreIcon from '../../../assets/icons/arrow-forward-outline.svg';

const ThisWeekModule = (): JSX.Element => {
    const daysOfTheWeekArray: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Firday', 'Saturday', 'Sunday'];
    const [activeDaysFilter, setActiveDaysFilter] = useState<number>(0);

    // useEffect(() => {

    // }, []);

    const renderDaysOfTheWeek = (): JSX.Element => {
       
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
        )
    }

    const renderEvents = (): JSX.Element => {
        
        return (
            <div className="eventsThisWeek">
                <div className="eventsThisWeek-eventContainer">
                    <div className="eventsThisWeek-event">
                        <div className="eventsThisWeek-image" style={{ backgroundImage: `url("${image}")` }} />
                        <div className="eventsThisWeek-imageOverlay" />
                        <div className="eventsThisWeek-content">
                            <div className="eventsThisWeek-location">Klein Phönix</div>
                            <div className="eventsThisWeek-date">10 Nov 2021 Wed 18:00 - 00:00</div>
                            
                            <div className="eventsThisWeek-title">Enrico Sangiuliano</div>
                        </div>
                    </div>
                    <button className="eventsThisWeek-purchaseButton">Buy Now</button>
                </div>
            </div>
        );
    }

    return (
        <div className="thisWeekModule">
            <div className="thisWeekModule-header">
                <div className="thisWeekModule-title">
                    This Week
                </div>
                { 
                    renderDaysOfTheWeek() 
                }
                <div className="thisWeekModule-moreButton">
                    <div className="thisWeekModule-text">See All</div>
                    <div className="thisWeekModule-moreIcom">
                        <img src={moreIcon} alt="moreIcom" />
                    </div>
                </div>
            </div>
            { renderEvents() }
        </div>   
    );
}

export default ThisWeekModule;