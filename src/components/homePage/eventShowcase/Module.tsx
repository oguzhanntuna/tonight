import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Module.scss';

import { IApplicationState } from '../../../models/interfaces/store/states/application';
import * as eventActions from '../../../store/actions/events';

import EventShowcaseHeader from './Header';
import EventShowcaseEventsContainer from './EventsContainer';

interface IEventShowcaseModuleProps {
    title: string;
    displayFilters: boolean;
    moduleType: string;
}

const EventShowcaseModule = (props: IEventShowcaseModuleProps): JSX.Element => {
    const { fetchThisWeekEvents, fetchRecentlyAddedEvents, fetchBuyNowEvents } = eventActions;
    const { title, moduleType, displayFilters } = props;

    const dispatch = useDispatch();

    const eventData = useSelector((state: IApplicationState) => {
        switch (moduleType) {
            case 'this-week': 
                return state.events.thisWeekEvents;

            case 'recently-added': 
                return state.events.recentlyAddedEvents;

            case 'buy-now': 
                return state.events.buyNowEvents;
        }
    });

    useEffect(() => {
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
        
    }, [dispatch, fetchThisWeekEvents, fetchRecentlyAddedEvents, fetchBuyNowEvents, moduleType]);

    return (
        <div className="eventShowcaseModule" >
            <EventShowcaseHeader title={title} displayFilters={displayFilters}/>
            <EventShowcaseEventsContainer eventData={eventData} />            
        </div>   
    );
}

export default EventShowcaseModule;