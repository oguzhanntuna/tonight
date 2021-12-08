import './EventsContainer.scss';

import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';

import EventTicket from '../../eventTicket/EventTicket';

interface IEventShowcaseEventsContainerProps {
    eventData: Array<IEventShowcaseEvent>;
}

const EventShowcaseEventsContainer = (props: IEventShowcaseEventsContainerProps): JSX.Element => {
    const { eventData } = props;

    return (
        <div className="eventsContainer">
            { eventData.map(event => <EventTicket key={event.id} eventData={event} />) }
        </div>
    );
}

export default EventShowcaseEventsContainer;