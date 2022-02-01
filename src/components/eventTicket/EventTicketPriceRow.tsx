import './EventTicketPriceRow.scss';
import { useDispatch } from 'react-redux';

import { EventShowcaseEvent } from '../../models/eventShowcase/event';
import { FavoriteEvent } from '../../models/favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent, IEventShowCaseTicket } from '../../models/interfaces/eventShowcase/eventShowcase';
import { IFavoriteEvent } from '../../models/interfaces/favoriteEvent/favoriteEvent';
import { ICartEvent } from '../../models/interfaces/cartEvent/cartEvent';
import { IPurchasedTicket } from '../../models/interfaces/purchasedTicket/purchasedTicket';
import * as EventActions from '../../store/actions/events';
import * as FavoritesActions from '../../store/actions/favorites';

import addIcon from '../../assets/icons/add.svg';
import removeIcon from '../../assets/icons/remove.svg';

interface IEventTicketPriceRowProps {
    eventData: IEventShowcaseEvent | IFavoriteEvent | ICartEvent | IPurchasedTicket;
    ticketData: IEventShowCaseTicket;
}

const EventTicketPriceRow = (props: IEventTicketPriceRowProps): JSX.Element => {
    const { ticketData, eventData } = props;
    const { type, title, price, count } = ticketData;
    const { addNormalTicket, addVipTicket, removeNormalTicket, removeVipTicket } = EventActions;
    const { favoritesAddNormalTicket, favoritesAddVipTicket, favoritesRemoveNormalTicket, favoritesRemoveVipTicket } = FavoritesActions;
    
    const dispatch = useDispatch();

    const addTicket = () => {

        if (eventData instanceof EventShowcaseEvent) {

            type === 'normal' 
                ? dispatch(addNormalTicket(eventData)) 
                : dispatch(addVipTicket(eventData))
        } 
        
        if (eventData instanceof FavoriteEvent) {
            
            type === 'normal' 
                ? dispatch(favoritesAddNormalTicket(eventData)) 
                : dispatch(favoritesAddVipTicket(eventData))
        }
    }

    const removeTicket = () => {

        if (eventData instanceof EventShowcaseEvent) {

            type === 'normal' 
                ? dispatch(removeNormalTicket(eventData)) 
                : dispatch(removeVipTicket(eventData))
        } 
        
        if (eventData instanceof FavoriteEvent) {
            
            type === 'normal' 
                ? dispatch(favoritesRemoveNormalTicket(eventData)) 
                : dispatch(favoritesRemoveVipTicket(eventData))
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