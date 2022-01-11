import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './EventTicket.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import { IToastMessageData } from '../../models/interfaces/toastMessage/toastMessage';
import * as eventActions from '../../store/actions/events';
import * as cartActions from '../../store/actions/cart';
import * as toastMessageActions from '../../store/actions/toastMessage';

import EventTicketPriceSide from './EventTicketPriceSide';
import EventTicketInfoSide from './EventTicketInfoSide';

interface IEventTicketProps {
    eventData: IEventShowcaseEvent;
}

const EventTicket = (props: IEventTicketProps): JSX.Element => {
    const { eventData } = props;
    const { resetTicketsCount } = eventActions;
    const { addToCart } = cartActions;
    const { setToastMessage } = toastMessageActions;

    const [isTicketSelected, setIsTicketSelected] = useState<boolean>(false);
    const isLoggedin = useSelector((state: IApplicationState) => state.auth.token);

    const dispatch = useDispatch();

    const toggleTicketSide = (): void => setIsTicketSelected(prevState => !prevState);

    const addEventToCart = (event: IEventShowcaseEvent) => {
        let toastMessageData: IToastMessageData;

        if (isLoggedin) {
            const { normalTicket, vipTicket } = event;
            const normalTicketCount = normalTicket.count;
            const vipTicketCount = vipTicket.count;

            toastMessageData = {
                messageType: 'success',
                message: `${normalTicketCount+vipTicketCount} ${normalTicketCount+vipTicketCount > 1 ? 'tickets' : 'ticket'} added to cart. `
            }

            dispatch(addToCart(event));
            dispatch(resetTicketsCount(event));
            
            dispatch(setToastMessage(toastMessageData));

        } else {
            toastMessageData = {
                messageType: 'warning',
                message: 'You need to login to add any ticket to your cart!'
            }

            dispatch(setToastMessage(toastMessageData));
        }
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