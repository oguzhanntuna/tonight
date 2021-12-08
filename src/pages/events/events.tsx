import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './events.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as eventActions from '../../store/actions/events';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/heroImage.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';

const EventsPage = (): JSX.Element => {
    const { fetchEvents } = eventActions;

    const dispatch = useDispatch();
    const allEvents = useSelector((state: IApplicationState) => state.events.allEvents);

    useEffect(() => {
        dispatch(fetchEvents());

        window.scrollTo({ top: 0, left: 0 });

    }, [dispatch, fetchEvents]);

    console.log(allEvents);

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