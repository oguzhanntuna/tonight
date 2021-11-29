import axios from 'axios';
import { useEffect } from 'react';
import './Module.scss';

import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';

import EventShowcaseHeader from './Header';
import EventShowcaseEventsContainer from './EventsContainer';

interface IEventShowcaseModuleProps {
    title: string;
    displayFilters: boolean;
    eventData: Array<IEventShowcaseEvent>
}

const EventShowcaseModule = (props: IEventShowcaseModuleProps): JSX.Element => {
    const { title, eventData, displayFilters } = props;

    useEffect(() => {
        if (title !== 'Most Popular') {
            const moduleTypeSlug = title.replace(' ', '-').toLowerCase();

            axios.get(`https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/events/${moduleTypeSlug}.json`)
                .then(response => console.log(response.data))
                .catch(error => console.log(error));
        }
    }, []);

    return (
        <div className="eventShowcaseModule" >
            <EventShowcaseHeader title={title} displayFilters={displayFilters}/>
            <EventShowcaseEventsContainer eventData={eventData} />            
        </div>   
    );
}

export default EventShowcaseModule;