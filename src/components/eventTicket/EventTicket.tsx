import { useDispatch, useSelector } from 'react-redux';
import './EventTicket.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as eventActions from '../../store/actions/events';
import * as cartActions from '../../store/actions/cart';
import EventTicketPriceSide from './EventTicketPriceSide';
import EventTicketInfoSide from './EventTicketInfoSide';

interface IEventTicketProps {
    eventData: IEventShowcaseEvent;
}

const EventTicket = (props: IEventTicketProps): JSX.Element => {
    const {eventData } = props;
    const { setEventActive, resetTicketsCount } = eventActions;
    const { addToCart } = cartActions;

    const dispatch = useDispatch();
    const activeEventIdsArray = useSelector((state: IApplicationState) => state.events.activeEventIds);

    const isEventSelected = (eventId: number) => activeEventIdsArray.indexOf(eventId) !== -1 ? true : false;

    const addEventToCart = (event: IEventShowcaseEvent) => {
        dispatch(addToCart(event));
        dispatch(resetTicketsCount(event.id));
    }

    return (
        <div className={`eventTicket ${isEventSelected(eventData.id) ? 'active' : ''}`}>
            { 
                isEventSelected(eventData.id)
                    ? <EventTicketPriceSide eventData={eventData} /> 
                    : <EventTicketInfoSide eventData={eventData} /> 
            }
            <button 
                className={`
                    eventTicket-purchaseButton 
                    ${isEventSelected(eventData.id) ? 'addToCart' : ''}
                    ${eventData.totalPrice > 0 ? 'active' : ''}
                `}
                onClick={() => {
                    isEventSelected(eventData.id)
                        ? addEventToCart(eventData)
                        : dispatch(setEventActive(eventData.id))
                }}
                disabled={isEventSelected(eventData.id) && eventData.totalPrice === 0}
            >
                { isEventSelected(eventData.id) ? 'Add To Cart' : 'Buy Now'}
            </button>
        </div>
    );
}

export default EventTicket;