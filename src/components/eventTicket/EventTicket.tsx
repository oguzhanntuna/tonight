import { useDispatch } from 'react-redux';
import './EventTicket.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import * as eventActions from '../../store/actions/events';
import * as cartActions from '../../store/actions/cart';
import EventTicketPriceSide from './EventTicketPriceSide';
import EventTicketInfoSide from './EventTicketInfoSide';
import { useState } from 'react';

interface IEventTicketProps {
    eventData: IEventShowcaseEvent;
}

const EventTicket = (props: IEventTicketProps): JSX.Element => {
    const {eventData } = props;
    const { resetTicketsCount } = eventActions;
    const { addToCart } = cartActions;

    const [isTicketSelected, setIsTicketSelected] = useState<boolean>(false);

    const dispatch = useDispatch();

    const toggleTicketSide = (): void => setIsTicketSelected(prevState => !prevState);

    const addEventToCart = (event: IEventShowcaseEvent) => {
        dispatch(addToCart(event));
        dispatch(resetTicketsCount(event.id));
    }

    return (
        <div className={`eventTicket ${isTicketSelected ? 'active' : ''}`}>
            { 
                isTicketSelected
                    ? <EventTicketPriceSide eventData={eventData} toggleTicketSide={() => toggleTicketSide()} /> 
                    : <EventTicketInfoSide eventData={eventData} toggleTicketSide={() => toggleTicketSide()} /> 
            }
            <button 
                className={`
                    eventTicket-purchaseButton 
                    ${isTicketSelected ? 'addToCart' : ''}
                    ${eventData.totalPrice > 0 ? 'active' : ''}
                `}
                onClick={() => {
                    isTicketSelected
                        ? addEventToCart(eventData)
                        : toggleTicketSide()
                }}
                disabled={isTicketSelected && eventData.totalPrice === 0}
            >
                { isTicketSelected ? 'Add To Cart' : 'Buy Now'}
            </button>
        </div>
    );
}

export default EventTicket;