import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './thisWeekEvents.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as EventActions from '../../store/actions/events';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/heroImage.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';

const ThisWeekEventsPage = (): JSX.Element => {
    const { fetchThisWeekEvents } = EventActions;
    const thisWeekEvents = useSelector((state: IApplicationState) => state.events.thisWeekEvents);
    const dispatch = useDispatch();

    useEffect(() => {

        if (thisWeekEvents && thisWeekEvents.length === 0) {
            dispatch(fetchThisWeekEvents());
        }
    }, [thisWeekEvents, dispatch, fetchThisWeekEvents]);

    return (
        <div className="thisWeekEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="thisWeekEventsPage-content">
                <div className="thisWeekEventsContainer">
                    <div className="thisWeekEventsContainer-title">
                        This Week Events
                    </div>
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
                </div>
            </div>
        </div>
    );
}

export default ThisWeekEventsPage;