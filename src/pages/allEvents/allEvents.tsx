import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './allEvents.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as ThisWeekEventsActions from '../../store/actions/thisWeekEvents';
import * as RecentlyAddedEventsActions from '../../store/actions/recentlyAddedEvents';
import * as BuyNowEventsActions from '../../store/actions/buyNowEvents';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/hero.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';

const AllEventsPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        thisWeekEvents: thisWeekEventsState,
        recentlyAddedEvents: recentlyAddedEventsState,
        buyNowEvents: buyNowEventsState
    } = useSelector((state: IApplicationState) => state);
    const { events: thisWeekEvents, loading: thisWeekEventsLoading  } = thisWeekEventsState;
    const { events: recentlyAddedEvents, loading: recentlyAddedEventsLoading  } = recentlyAddedEventsState;
    const { events: buyNowEvents, loading: buyNowEventsLoading   } = buyNowEventsState;
    const [allEvents, setAllEvents] = useState<Array<IEventShowcaseEvent>>([]);

    useScrollToTop();

    useEffect(() => {
        const { fetchThisWeekEvents } = ThisWeekEventsActions;
        const { fetchRecentlyAddedEvents } = RecentlyAddedEventsActions;
        const { fetchBuyNowEvents } = BuyNowEventsActions;

        if (thisWeekEvents && thisWeekEvents.length === 0 && !thisWeekEventsLoading) {

            dispatch(fetchThisWeekEvents());
        }

        if (recentlyAddedEvents && recentlyAddedEvents.length === 0 && !recentlyAddedEventsLoading) {

            dispatch(fetchRecentlyAddedEvents());
        }

        if (buyNowEvents && buyNowEvents.length === 0 && !buyNowEventsLoading) {

            dispatch(fetchBuyNowEvents());
        }

        if (
            thisWeekEvents && thisWeekEvents.length > 0 && 
            recentlyAddedEvents && recentlyAddedEvents.length > 0 && 
            buyNowEvents && buyNowEvents.length > 0 
        ) {
            setAllEvents([...thisWeekEvents, ...recentlyAddedEvents, ...buyNowEvents]);
        }

    }, [thisWeekEvents, thisWeekEventsLoading, recentlyAddedEvents, recentlyAddedEventsLoading, buyNowEvents, buyNowEventsLoading, dispatch]);

    return (
        <div className="allEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="allEventsPage-content">
                <div className="allEventsContainer">
                    <div className="allEventsContainer-title">
                        All Events
                    </div>
                    {
                        thisWeekEventsLoading || recentlyAddedEventsLoading || buyNowEventsLoading
                            ? <p>Loading...</p>
                            : (
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
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default AllEventsPage;