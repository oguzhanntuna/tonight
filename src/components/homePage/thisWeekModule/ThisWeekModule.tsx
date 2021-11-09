import './ThisWeekModule.scss';

import image from '../../../assets/Screen Shot 2021-11-09 at 4.19.30 PM.png';

const ThisWeekModule = (): JSX.Element => {
    const daysOfTheWeekArray: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Firday', 'Saturday', 'Sunday'];

    const renderDaysOfTheWeek = (): JSX.Element => {
        
        return (
            <div className="daysOfTheWeekFilters">
                {
                    daysOfTheWeekArray.map((day, index) => (
                        <div className="daysOfTheWeekFilters-days" key={`${day}-${index}`}>
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
                <div className="eventsThisWeek-event">
                    <div className="eventsThisWeek-imageContainer">
                        <img className="eventsThisWeek-image" src={image} alt="" />
                        <div className="eventsThisWeek-title">Title</div>
                    </div>
                    <div className="eventsThisWeek-infoContainer">
                        <div className="eventsThisWeek-info">
                            <div className="eventsThisWeek-date">Sunday</div>
                            <div className="eventsThisWeek-location">Klein</div>
                        </div>
                        <button className="eventsThisWeek-buyNowButton">Buy Now</button>
                    </div>
                </div>
                <div className="eventsThisWeek-event">
                    <div className="eventsThisWeek-imageContainer">
                        <img className="eventsThisWeek-image" src={image} alt="" />
                        <div className="eventsThisWeek-title">Title</div>
                    </div>
                    <div className="eventsThisWeek-infoContainer">
                        <div className="eventsThisWeek-info">
                            <div className="eventsThisWeek-date">Sunday</div>
                            <div className="eventsThisWeek-location">Klein</div>
                        </div>
                        <button className="eventsThisWeek-buyNowButton">Buy Now</button>
                    </div>
                </div>
                <div className="eventsThisWeek-event">
                    <div className="eventsThisWeek-imageContainer">
                        <img className="eventsThisWeek-image" src={image} alt="" />
                        <div className="eventsThisWeek-title">Title</div>
                    </div>
                    <div className="eventsThisWeek-infoContainer">
                        <div className="eventsThisWeek-info">
                            <div className="eventsThisWeek-date">Sunday</div>
                            <div className="eventsThisWeek-location">Klein</div>
                        </div>
                        <button className="eventsThisWeek-buyNowButton">Buy Now</button>
                    </div>
                </div>
                <div className="eventsThisWeek-event">
                    <div className="eventsThisWeek-imageContainer">
                        <img className="eventsThisWeek-image" src={image} alt="" />
                        <div className="eventsThisWeek-title">Title</div>
                    </div>
                    <div className="eventsThisWeek-infoContainer">
                        <div className="eventsThisWeek-info">
                            <div className="eventsThisWeek-date">Sunday</div>
                            <div className="eventsThisWeek-location">Klein</div>
                        </div>
                        <button className="eventsThisWeek-buyNowButton">Buy Now</button>
                    </div>
                </div>
                <div className="eventsThisWeek-event">
                    <div className="eventsThisWeek-imageContainer">
                        <img className="eventsThisWeek-image" src={image} alt="" />
                        <div className="eventsThisWeek-title">Title</div>
                    </div>
                    <div className="eventsThisWeek-infoContainer">
                        <div className="eventsThisWeek-info">
                            <div className="eventsThisWeek-date">Sunday</div>
                            <div className="eventsThisWeek-location">Klein</div>
                        </div>
                        <button className="eventsThisWeek-buyNowButton">Buy Now</button>
                    </div>
                </div>
                <div className="eventsThisWeek-event">
                    <div className="eventsThisWeek-imageContainer">
                        <img className="eventsThisWeek-image" src={image} alt="" />
                        <div className="eventsThisWeek-title">Title</div>
                    </div>
                    <div className="eventsThisWeek-infoContainer">
                        <div className="eventsThisWeek-info">
                            <div className="eventsThisWeek-date">Sunday</div>
                            <div className="eventsThisWeek-location">Klein</div>
                        </div>
                        <button className="eventsThisWeek-buyNowButton">Buy Now</button>
                    </div>
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
                { renderDaysOfTheWeek() }
            </div>
            { renderEvents() }
        </div>   
    );
}

export default ThisWeekModule;