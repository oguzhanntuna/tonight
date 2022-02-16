import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './allEvents.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as eventActions from '../../store/actions/events';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/hero.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';

const AllEventsPage = (): JSX.Element => {
    const { fetchAllEvents } = eventActions;
    const dispatch = useDispatch();
    const allEvents = useSelector((state: IApplicationState) => state.events.allEvents);

    useScrollToTop();

    useEffect(() => {
        dispatch(fetchAllEvents());

    }, [dispatch, fetchAllEvents]);

    return (
        <div className="allEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="allEventsPage-content">
                <div className="allEventsContainer">
                    <div className="allEventsContainer-title">
                        All Events
                    </div>
                    <div className="allEventsContainer-events">
                        { 
                            allEvents.map((event, index) => (
                                <EventTicket 
                                    key={`${index}-${event.id}`} 
                                    eventData={event} 
                                />
                            )) 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllEventsPage;