import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './recentlyAddedEvents.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as EventActions from '../../store/actions/events';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/techno8.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';
import { useScrollToTop } from '../../customHooks/useScrollToTop';

const RecentlyAddedEventsPage = (): JSX.Element => {
    const { fetchRecentlyAddedEvents } = EventActions;
    const recentlyAddedEvents = useSelector((state: IApplicationState) => state.events.recentlyAddedEvents);
    const dispatch = useDispatch();
    
    useScrollToTop();

    useEffect(() => {

        if (recentlyAddedEvents && recentlyAddedEvents.length === 0) {
            dispatch(fetchRecentlyAddedEvents());
        }
    }, [recentlyAddedEvents, dispatch, fetchRecentlyAddedEvents])

    return (
        <div className="recentlyAddedEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="recentlyAddedEventsPage-content">
                <div className="recentlyAddedEventsContainer">
                    <div className="recentlyAddedEventsContainer-title">
                        Recently Added Events
                    </div>
                    <div className="recentlyAddedEventsContainer-events">
                        { 
                            recentlyAddedEvents.map((event, index) => (
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

export default RecentlyAddedEventsPage;