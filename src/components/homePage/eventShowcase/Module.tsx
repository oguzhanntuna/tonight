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

    return (
        <div className="eventShowcaseModule" >
            <EventShowcaseHeader title={title} displayFilters={displayFilters}/>
            <EventShowcaseEventsContainer eventData={eventData} />            
        </div>   
    );
}

export default EventShowcaseModule;