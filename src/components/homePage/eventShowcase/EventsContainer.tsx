import './EventsContainer.scss';

import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/eventShowcase';
import { IDropdownItem } from './Filters';

import EventTicket from '../../eventTicket/EventTicket';
import ticketIcon from '../../../assets/icons/ticket/ticket-full.svg';

interface IEventShowcaseEventsContainerProps {
    eventData: Array<IEventShowcaseEvent> | undefined;
    activeDayFilter: IDropdownItem;
}

const EventShowcaseEventsContainer = (props: IEventShowcaseEventsContainerProps): JSX.Element => {
    const { eventData, activeDayFilter: { name } } = props;

    const renderEmptyState = () => (
        <div className="eventsContainer-emptyState">
            <div className="eventsContainer-emptyStateIcon">
                <img src={ticketIcon} alt="emptyState" />
            </div>
            <p>There are no events on this { name }!</p>
        </div>
    )

    const renderEvents = () => (
        <div className="eventsContainer-events">
            {
                eventData?.map((event, index) => (
                    <EventTicket 
                        key={`${index}-${event.id}`} 
                        eventData={event} 
                    />
                ))
            }
        </div>
    );

    return (
        <div className="eventsContainer">
            { eventData && eventData.length > 0 && renderEvents() }
            { eventData && eventData.length === 0 && renderEmptyState() }
        </div>
    );
}

export default EventShowcaseEventsContainer;