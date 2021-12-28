import { useDispatch } from 'react-redux';
import './EventTicketPriceSide.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import * as eventActions from '../../store/actions/events';

import EventTicketPriceRow from './EventTicketPriceRow';
import returnBackIcon from '../../assets/icons/return-back.svg';

interface IEventTicketPriceSide {
    eventData: IEventShowcaseEvent;
}

const EventTicketPriceSide = (props: IEventTicketPriceSide): JSX.Element => {
    const { eventData } = props;
    const { id, title, normalTicket, vipTicket, totalPrice } = eventData;
    const { setEventInactive } = eventActions;

    const dispatch = useDispatch();

    return (
        <div className="eventTicketPriceSide">
            <div className="eventTicketPriceSide-header">
                <div className="eventTicketPriceSide-eventTitle">{title}</div>
                <div className="eventTicketPriceSide-returnBackIcon" onClick={() => dispatch(setEventInactive(eventData.id))}>
                    <img src={returnBackIcon} alt="return back icon" />
                </div>
            </div>
            <div className="eventTicketPriceSide-content">
                <EventTicketPriceRow 
                    ticketData={normalTicket} 
                    eventId={id}
                />
                <EventTicketPriceRow 
                    ticketData={vipTicket} 
                    eventId={id}
                />
            </div>
            <div className="eventTicketPriceSide-totalPriceContainer">
                <span className="eventTicketPriceSide-text">Total:</span>
                <span className="eventTicketPriceSide-price">{`${totalPrice}$`}</span>
            </div>
        </div> 
    );
}

export default EventTicketPriceSide;