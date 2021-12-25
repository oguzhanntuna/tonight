import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './events.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/heroImage.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';

const EventsPage = (): JSX.Element => {
    const allEvents = useSelector((state: IApplicationState) => state.events.allEvents);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });

    }, []);

    return (
        <div className="eventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="eventsPage-content">
                <div className="allEventsContainer">
                    <div className="allEventsContainer-header">
                        All Events
                    </div>
                    <div className="allEventsContainer-events">
                        { allEvents.map(event => <EventTicket key={event.id} eventData={event} /> ) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventsPage;