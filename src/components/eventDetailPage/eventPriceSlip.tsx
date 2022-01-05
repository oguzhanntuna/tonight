import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import './eventPriceSlip.scss';

import * as cartActions from '../../store/actions/cart';
import * as eventActions from '../../store/actions/events';

import EventTicketPriceRow from '../eventTicket/EventTicketPriceRow';
import { useDispatch } from 'react-redux';

interface IEventPriceSlip {
    data: IEventShowcaseEvent;
}

const EventPriceSlip = (props: IEventPriceSlip): JSX.Element => {
    const { data } = props;
    const { title, normalTicket, vipTicket, totalPrice } = data;
    const { addToCart } = cartActions;
    const { resetTicketsCount } = eventActions;

    const dispatch = useDispatch();

    const addEventToCart = (event: IEventShowcaseEvent) => {
        dispatch(addToCart(event));
        dispatch(resetTicketsCount(event));
    }

    return (
        <div className="eventPriceSlip">
            <div className="eventPriceSlip-eventTitle">
                {title}
            </div>
            <div className="eventPriceSlip-content">
                <EventTicketPriceRow 
                    ticketData={normalTicket}
                    eventData={data}
                />
                <EventTicketPriceRow 
                    ticketData={vipTicket}
                    eventData={data}
                />
            </div>
            <div className="eventPriceSlip-totalPriceContainer">
                <span className="eventPriceSlip-text">Total:</span>
                <span className="eventPriceSlip-price">{`${totalPrice}$`}</span>
            </div>
            <button 
                className={`
                    eventPriceSlip-buyNowButton 
                    ${totalPrice <= 0 ? 'eventPriceSlip-buyNowButton--disabled' : ''
                }`}
                onClick={() => addEventToCart(data)}
                disabled={totalPrice <= 0}
            >
                Buy Now
            </button>
        </div>
    );
}

export default EventPriceSlip;