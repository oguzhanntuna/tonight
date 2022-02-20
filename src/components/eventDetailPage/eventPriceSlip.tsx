import { useDispatch } from 'react-redux';
import './EventPriceSlip.scss';

import * as cartActions from '../../store/actions/cart';
import EventTicketPriceRow from '../eventTicket/EventTicketPriceRow';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';

interface IEventPriceSlip {
    data: IEventShowcaseEvent;
}

const EventPriceSlip = (props: IEventPriceSlip): JSX.Element => {
    const { data } = props;
    const { title, normalTicket, vipTicket, totalPrice } = data;
    const { addToCart } = cartActions;

    const dispatch = useDispatch();

    const addEventToCart = (event: IEventShowcaseEvent) => {
        dispatch(addToCart(event));
        // reset ticket count
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
                Add To Cart
            </button>
        </div>
    );
}

export default EventPriceSlip;