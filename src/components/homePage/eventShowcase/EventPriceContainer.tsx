import './EventPriceContainer.scss';
import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';

import EventShowcaseEventPriceRow from './EventPriceRow';
import returnBackIcon from '../../../assets/icons/return-back.svg';
interface IEventShowcaseEventPriceContainerProps {
    eventData: IEventShowcaseEvent;
    selectedEventIdArray: Array<number | null>;
    onReturnBackButtonClicked(): void
}

const EventShowcaseEventPriceContainer = (props: IEventShowcaseEventPriceContainerProps): JSX.Element => {
    const { eventData, selectedEventIdArray, onReturnBackButtonClicked } = props;
    const { id, title, normalTicket, vipTicket, totalPrice } = eventData;

    return (
        <div className="eventPriceContainer">
            <div className="eventPriceContainer-header">
                <div className="eventPriceContainer-eventTitle">{title}</div>
                <div className="eventPriceContainer-returnBackIcon" onClick={() => onReturnBackButtonClicked()}>
                    <img src={returnBackIcon} alt="return back icon" />
                </div>
            </div>
            <div className="eventPriceContainer-content">
                <EventShowcaseEventPriceRow 
                    ticketData={normalTicket} 
                    eventId={id}
                    selectedEventIdArray={selectedEventIdArray}
                />
                <EventShowcaseEventPriceRow 
                    ticketData={vipTicket} 
                    eventId={id}
                    selectedEventIdArray={selectedEventIdArray}
                />
            </div>
            <div className="eventPriceContainer-totalPrice">{`Total: ${totalPrice}$`}</div>
        </div> 
    );
}

export default EventShowcaseEventPriceContainer;