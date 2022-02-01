import './EventTicketPriceSide.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { IFavoriteEvent } from '../../models/interfaces/favoriteEvent/favoriteEvent';
import { ICartEvent } from '../../models/interfaces/cartEvent/cartEvent';

import EventTicketPriceRow from './EventTicketPriceRow';
import returnBackIcon from '../../assets/icons/return-back.svg';
import { IPurchasedTicket } from '../../models/interfaces/purchasedTicket/purchasedTicket';

interface IEventTicketPriceSide {
    eventData: IEventShowcaseEvent | IFavoriteEvent | ICartEvent | IPurchasedTicket;
    toggleTicketSide: () => void;
}

const EventTicketPriceSide = (props: IEventTicketPriceSide): JSX.Element => {
    const { eventData, toggleTicketSide } = props;
    const { title, normalTicket, vipTicket, totalPrice } = eventData;

    return (
        <div className="eventTicketPriceSide">
            <div className="eventTicketPriceSide-header">
                <div className="eventTicketPriceSide-eventTitle">{title}</div>
                <div className="eventTicketPriceSide-returnBackIcon" onClick={() => toggleTicketSide()}>
                    <img src={returnBackIcon} alt="return back icon" />
                </div>
            </div>
            <div className="eventTicketPriceSide-content">
                <EventTicketPriceRow 
                    ticketData={normalTicket} 
                    eventData={eventData}
                />
                <EventTicketPriceRow 
                    ticketData={vipTicket} 
                    eventData={eventData}
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