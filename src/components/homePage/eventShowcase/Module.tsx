import './Module.scss';
import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';

import EventShowcaseHeader from './Header';
import EventShowcaseEventsContainer from './EventsContainer';

interface IEventShowcaseModuleProps {
    title: string;
    displayFilters: boolean;
    data: Array<IEventShowcaseEvent>
}

const EventShowcaseModule = (props: IEventShowcaseModuleProps): JSX.Element => {
    const { title, data, displayFilters } = props;

    return (
        <div className="eventShowcaseModule" >
            <EventShowcaseHeader title={title} displayFilters={displayFilters}/>
            <EventShowcaseEventsContainer data={data} />            
        </div>   
    );
}

export default EventShowcaseModule;