import './EventsContainer.scss';

import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/eventShowcase';

import EventTicket from '../../eventTicket/EventTicket';

interface IEventShowcaseEventsContainerProps {
    eventData: Array<IEventShowcaseEvent> | undefined;
}

const EventShowcaseEventsContainer = (props: IEventShowcaseEventsContainerProps): JSX.Element => {
    const { eventData } = props;

    return (
        <div className="eventsContainer">
            { eventData && eventData.map((event, index) => <EventTicket key={`${index}-${event.id}`} eventData={event} />) }
        </div>
    );
}

export default EventShowcaseEventsContainer;