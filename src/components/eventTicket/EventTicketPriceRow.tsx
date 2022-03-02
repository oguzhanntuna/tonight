import './EventTicketPriceRow.scss';
import { useDispatch } from 'react-redux';

import { EventShowcaseEvent } from '../../models/eventShowcase/event';
import { FavoriteEvent } from '../../models/favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent, IEventShowCaseTicket } from '../../models/interfaces/eventShowcase/eventShowcase';
import { IFavoriteEvent } from '../../models/interfaces/favoriteEvent/favoriteEvent';
import { ICartEvent } from '../../models/interfaces/cartEvent/cartEvent';
import { IPurchasedTicket } from '../../models/interfaces/purchasedTicket/purchasedTicket';
import * as FavoritesActions from '../../store/actions/favorites';
import * as ThisWeekEventsActions from '../../store/actions/thisWeekEvents';
import * as RecentlyAddedEventsActions from '../../store/actions/recentlyAddedEvents';
import * as BuyNowEventsActions from '../../store/actions/buyNowEvents';
import * as EventDetailActions from '../../store/actions/eventDetail';

import addIcon from '../../assets/icons/add.svg';
import removeIcon from '../../assets/icons/remove.svg';

interface IEventTicketPriceRowProps {
    eventData: IEventShowcaseEvent | IFavoriteEvent | ICartEvent | IPurchasedTicket;
    ticketData: IEventShowCaseTicket;
}

const EventTicketPriceRow = (props: IEventTicketPriceRowProps): JSX.Element => {
    const { ticketData, eventData } = props;
    const { type, title, price, count } = ticketData;
    const { favoritesAddNormalTicket, favoritesAddVipTicket, favoritesRemoveNormalTicket, favoritesRemoveVipTicket } = FavoritesActions;
    const dispatch = useDispatch();

    const addTicket = () => {

        if (eventData instanceof EventShowcaseEvent) {
            const { moduleType } = eventData;

            if (moduleType === 'this-week') {
                const { addNormalTicket, addVipTicket } = ThisWeekEventsActions;

                type === 'normal' && dispatch(addNormalTicket(eventData)); 
                type === 'vip' && dispatch(addVipTicket(eventData));
            }

            if (moduleType === 'recently-added') {
                const { addNormalTicket, addVipTicket } = RecentlyAddedEventsActions;

                type === 'normal' && dispatch(addNormalTicket(eventData)); 
                type === 'vip' && dispatch(addVipTicket(eventData));
            }

            if (moduleType === 'buy-now') {
                const { addNormalTicket, addVipTicket } = BuyNowEventsActions;

                type === 'normal' && dispatch(addNormalTicket(eventData)); 
                type === 'vip' && dispatch(addVipTicket(eventData));
            }

            if (moduleType === 'event-detail') {
                const { addNormalTicket, addVipTicket } = EventDetailActions;

                type === 'normal' && dispatch(addNormalTicket(eventData)); 
                type === 'vip' && dispatch(addVipTicket(eventData));
            }
        } 
        
        if (eventData instanceof FavoriteEvent) {

            type === 'normal' && dispatch(favoritesAddNormalTicket(eventData));
            type === 'vip' && dispatch(favoritesAddVipTicket(eventData));
        }
    }

    const removeTicket = () => {

        if (eventData instanceof EventShowcaseEvent) {
            const { moduleType } = eventData;

            if (moduleType === 'this-week') {
                const { removeNormalTicket, removeVipTicket } = ThisWeekEventsActions;

                type === 'normal' && dispatch(removeNormalTicket(eventData)); 
                type === 'vip' && dispatch(removeVipTicket(eventData));
            }

            if (moduleType === 'recently-added') {
                const { removeNormalTicket, removeVipTicket } = RecentlyAddedEventsActions;

                type === 'normal' && dispatch(removeNormalTicket(eventData)); 
                type === 'vip' && dispatch(removeVipTicket(eventData));
            }

            if (moduleType === 'buy-now') {
                const { removeNormalTicket, removeVipTicket } = BuyNowEventsActions;

                type === 'normal' && dispatch(removeNormalTicket(eventData)); 
                type === 'vip' && dispatch(removeVipTicket(eventData));
            }

            if (moduleType === 'event-detail') {
                const { removeNormalTicket, removeVipTicket } = EventDetailActions;

                type === 'normal' && dispatch(removeNormalTicket(eventData)); 
                type === 'vip' && dispatch(removeVipTicket(eventData));
            }
        } 
        
        if (eventData instanceof FavoriteEvent) {

            type === 'normal' && dispatch(favoritesRemoveNormalTicket(eventData)); 
            type === 'vip' && dispatch(favoritesRemoveVipTicket(eventData));
        }
    }

    return (
        <div className="eventTicketPriceRow">
            <div className="eventTicketPriceRow-ticketInfoContainer">
                <div className="eventTicketPriceRow-ticketInfo">
                    <div className="eventTicketPriceRow-ticketType">{title}</div>
                    <div className="eventTicketPriceRow-ticketPrice">{price}$</div>
                </div>
                <div className="eventTicketPriceRow-ticketCount">{count}</div>
            </div>
            <div className="eventTicketPriceRow-buttonContainer">
                <button 
                    className={`eventTicketPriceRow-removeButton ${count === 0 ? 'disable' : ''}`} 
                    disabled={count === 0}
                    onClick={() => removeTicket()}
                >
                    <img src={removeIcon} alt="remove icon" />
                </button>
                <button 
                    className="eventTicketPriceRow-addButton"
                    onClick={() => addTicket()}
                >
                    <img src={addIcon} alt="add icon" />
                </button>
            </div>
        </div>
    );
}

export default EventTicketPriceRow;