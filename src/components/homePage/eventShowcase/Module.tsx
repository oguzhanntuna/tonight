import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Module.scss';

import { IDropdownItem } from './Filters';
import { IApplicationState } from '../../../models/interfaces/store/states/application';
import * as thisWeekEventsActions from '../../../store/actions/thisWeekEvents';
import * as recentlyAddedEventsActions from '../../../store/actions/recentlyAddedEvents';
import * as buyNowEventsActions from '../../../store/actions/buyNowEvents';

import EventShowcaseHeader from './Header';
import EventShowcaseEventsContainer from './EventsContainer';
import Spinner from '../../spinner/spinner';
import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/eventShowcase';

interface IEventShowcaseModuleProps {
    title: string;
    displayFilters: boolean;
    moduleType: string;
}

const EventShowcaseModule = (props: IEventShowcaseModuleProps): JSX.Element => {
    const { title, moduleType, displayFilters } = props;
    const [eventData, setEventData] = useState<IEventShowcaseEvent[] | undefined>([]);
    const [activeDayFilter, setActiveDayFilter] = useState<IDropdownItem>({
        name: "Saturday",
        value: "saturday"
    });

    const dispatch = useDispatch();
    const fetchedEventData = useSelector((state: IApplicationState) => {
        switch (moduleType) {
            case 'this-week': 
                return state.thisWeekEvents.events; 

            case 'recently-added': 
                return state.recentlyAddedEvents.events;

            case 'buy-now': 
                return state.buyNowEvents.events;
        }
    });
    const loading = useSelector((state: IApplicationState) => {
        switch (moduleType) {
            case 'this-week': 
                return state.thisWeekEvents.loading;

            case 'recently-added': 
                return state.recentlyAddedEvents.loading;

            case 'buy-now': 
                return state.buyNowEvents.loading;
        }
    });

    useEffect(() => {
        const { fetchThisWeekEvents } = thisWeekEventsActions;
        const { fetchRecentlyAddedEvents } = recentlyAddedEventsActions
        const { fetchBuyNowEvents } = buyNowEventsActions;

        if (fetchedEventData && fetchedEventData.length === 0) {
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
    }, [fetchedEventData, moduleType, dispatch]);

    useEffect(() => {
        if (fetchedEventData && fetchedEventData.length > 0) {
            if (moduleType === 'this-week') {
                const filteredFetchedThisWeekEventData = fetchedEventData.filter(event => {

                    return event.date.includes(activeDayFilter.name);
                });

                setEventData(filteredFetchedThisWeekEventData);

            } else {

                setEventData(fetchedEventData);
            }
        }
    }, [moduleType, fetchedEventData, activeDayFilter]);

    return (
        <div className="eventShowcaseModule" >
            <EventShowcaseHeader 
                title={title} 
                displayFilters={displayFilters}
                activeDayFilter={activeDayFilter}
                setActiveDayFilter={setActiveDayFilter}
            />
            {
                loading
                    ? <Spinner />
                    : <EventShowcaseEventsContainer eventData={eventData} />  
            }          
        </div>   
    );
}

export default EventShowcaseModule;