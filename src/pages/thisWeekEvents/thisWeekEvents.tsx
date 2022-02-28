import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './thisWeekEvents.scss';

import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as thisWeekEventActions from '../../store/actions/thisWeekEvents';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/hero.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';
import Spinner from '../../components/spinner/spinner';

const ThisWeekEventsPage = (): JSX.Element => {
    const { events: thisWeekEvents, loading } = useSelector((state: IApplicationState) => state.thisWeekEvents);
    const dispatch = useDispatch();

    useScrollToTop();
    
    useEffect(() => {
        const { fetchThisWeekEvents } = thisWeekEventActions;

        if (thisWeekEvents && thisWeekEvents.length === 0) {
            dispatch(fetchThisWeekEvents());
        }
    }, [thisWeekEvents, dispatch]);

    return (
        <div className="thisWeekEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="thisWeekEventsPage-content">
                <div className="thisWeekEventsContainer">
                    <div className="thisWeekEventsContainer-title">
                        This Week Events
                    </div>
                    {
                        loading
                            ? <Spinner />
                            : (
                                <div className="thisWeekEventsContainer-events">
                                    { 
                                        thisWeekEvents.map((event, index) => (
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

export default ThisWeekEventsPage;