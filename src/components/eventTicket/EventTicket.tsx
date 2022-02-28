import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './EventTicket.scss';

import { EventShowcaseEvent } from '../../models/eventShowcase/event';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { IToastMessageData } from '../../models/interfaces/toastMessage/toastMessage';
import { IFavoriteEvent } from '../../models/interfaces/favoriteEvent/favoriteEvent';
import { ICartEvent } from '../../models/interfaces/cartEvent/cartEvent';
import { IPurchasedTicket } from '../../models/interfaces/purchasedTicket/purchasedTicket';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as CartActions from '../../store/actions/cart';
import * as ToastMessageActions from '../../store/actions/toastMessage';

import EventTicketPriceSide from './EventTicketPriceSide';
import EventTicketInfoSide from './EventTicketInfoSide';
import { useLoggedIn } from '../../customHooks/useLoggedIn';
import { FavoriteEvent } from '../../models/favoriteEvent/favoriteEvent';

interface IEventTicketProps {
    eventData: IEventShowcaseEvent | IFavoriteEvent | ICartEvent | IPurchasedTicket;
}

const EventTicket = (props: IEventTicketProps): JSX.Element => {
    const { eventData } = props;
    const { addToCart } = CartActions;
    const { setToastMessage } = ToastMessageActions;

    const [isTicketSelected, setIsTicketSelected] = useState<boolean>(false);
    const [toastMessageData, setToastMessageData] = useState<IToastMessageData>({messageType: '', message: ''});
    const addToCartLoading = useSelector((state: IApplicationState) => state.cart.addToCartLoading);
    const isLoggedin = useLoggedIn();
    const dispatch = useDispatch();

    useEffect(() => {
        if (toastMessageData.message !== '') {
            dispatch(setToastMessage(toastMessageData));

            setToastMessageData({ messageType: '', message: '' });
        }
    }, [toastMessageData, dispatch, setToastMessage]);

    const toggleTicketSide = (): void => setIsTicketSelected(prevState => !prevState);

    const addEventToCart = (event: EventShowcaseEvent | FavoriteEvent) => {
        if (isLoggedin) {
            const { normalTicket, vipTicket } = event;
            const totalTicketCount = normalTicket.count + vipTicket.count

            setToastMessageData({
                messageType: 'success',
                message: `${totalTicketCount} ${totalTicketCount > 1 ? 'tickets' : 'ticket'} added to your cart.`
            });
            dispatch(addToCart(event));
        } else {
            setToastMessageData({
                messageType: 'warning',
                message: 'You need to login to add any ticket to your cart!'
            });
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
                        ? (eventData instanceof EventShowcaseEvent || eventData instanceof FavoriteEvent) && 
                            addEventToCart(eventData)
                        : toggleTicketSide()
                }}
                disabled={addToCartLoading || (isTicketSelected && eventData.totalPrice === 0)}
            >
                { isTicketSelected ? 'Add To Cart' : 'Buy Now'}
            </button>
        </div>
    );
}

export default EventTicket;