import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Module.scss';

import { IApplicationState } from '../../../models/interfaces/store/states/application';
import * as eventActions from '../../../store/actions/events';
import * as thisWeekEventActions from '../../../store/actions/thisWeekEvents';

import EventShowcaseHeader from './Header';
import EventShowcaseEventsContainer from './EventsContainer';

interface IEventShowcaseModuleProps {
    title: string;
    displayFilters: boolean;
    moduleType: string;
}

const EventShowcaseModule = (props: IEventShowcaseModuleProps): JSX.Element => {
    const { title, moduleType, displayFilters } = props;

    const dispatch = useDispatch();
    const eventData = useSelector((state: IApplicationState) => {
        switch (moduleType) {
            case 'this-week': 
                return state.thisWeekEvents.events;

            case 'recently-added': 
                return state.events.recentlyAddedEvents;

            case 'buy-now': 
                return state.events.buyNowEvents;
        }
    });

    useEffect(() => {
        console.log(eventData);
    }, [eventData]);

    useEffect(() => {
        const { fetchRecentlyAddedEvents, fetchBuyNowEvents } = eventActions;
        const { fetchThisWeekEvents } = thisWeekEventActions;

        if (eventData && eventData.length === 0) {
            switch (moduleType) {
                case 'this-week':
                    dispatch(fetchThisWeekEvents());
                    break;
    
                case 'recently-added':
                    dispatch(fetchRecentlyAddedEvents());
                    break;
    
                case 'buy-now':
                    dispatch(fetchBuyNowEvents());
                    break;
            }
        }
    }, [eventData, moduleType, dispatch]);

    return (
        <div className="eventShowcaseModule" >
            <EventShowcaseHeader title={title} displayFilters={displayFilters}/>
            <EventShowcaseEventsContainer eventData={eventData} />            
        </div>   
    );
}

export default EventShowcaseModule;