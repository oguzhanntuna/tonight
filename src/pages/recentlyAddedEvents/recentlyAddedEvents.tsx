import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './recentlyAddedEvents.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as RecentlyAddedEventsActions from '../../store/actions/recentlyAddedEvents';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/hero.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';
import { useScrollToTop } from '../../customHooks/useScrollToTop';

const RecentlyAddedEventsPage = (): JSX.Element => {
    const { events: recentlyAddedEvents, loading } = useSelector((state: IApplicationState) => state.recentlyAddedEvents);
    const dispatch = useDispatch();
    
    useScrollToTop();

    useEffect(() => {
        const { fetchRecentlyAddedEvents } = RecentlyAddedEventsActions;

        if (recentlyAddedEvents && recentlyAddedEvents.length === 0 && !loading) {
            dispatch(fetchRecentlyAddedEvents());
        }
    }, [recentlyAddedEvents, loading, dispatch])

    return (
        <div className="recentlyAddedEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="recentlyAddedEventsPage-content">
                <div className="recentlyAddedEventsContainer">
                    <div className="recentlyAddedEventsContainer-title">
                        Recently Added Events
                    </div>
                    {
                        loading
                            ? <p>Loading...</p>
                            : (
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
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default RecentlyAddedEventsPage;