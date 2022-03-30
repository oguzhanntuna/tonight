import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './EventPriceSlip.scss';

import * as cartActions from '../../store/actions/cart';
import { setToastMessage } from '../../store/actions/toastMessage';
import { useDeviceType } from '../../customHooks/useDeviceType';
import { useLoggedIn } from '../../customHooks/useLoggedIn';
import { EventShowcaseEvent } from '../../models/eventShowcase/event';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { IToastMessageData } from '../../models/interfaces/toastMessage/toastMessage';

import EventTicketPriceRow from '../eventTicket/EventTicketPriceRow';
import cancelButton from '../../assets/icons/cancel.svg';
import { useNavigate } from 'react-router-dom';

interface IEventPriceSlip {
    data: IEventShowcaseEvent;
}

const EventPriceSlip = (props: IEventPriceSlip): JSX.Element => {
    const { data } = props;
    const { title, normalTicket, vipTicket, totalPrice } = data;
    const deviceType = useDeviceType(); 
    const navigate = useNavigate();
    const { addToCart } = cartActions;

    const [toastMessageData, setToastMessageData] = useState<IToastMessageData>({messageType: '', message: ''});
    const isLoggedin = useLoggedIn();
    const dispatch = useDispatch();

    useEffect(() => {
        if (toastMessageData.message !== '') {
            dispatch(setToastMessage(toastMessageData));

            setToastMessageData({ messageType: '', message: '' });
        }
    }, [toastMessageData, dispatch]);

    useEffect(() => {
        return () => { data instanceof EventShowcaseEvent && data.resetEvent() }
    }, []);

    const addEventToCart = (event: IEventShowcaseEvent) => {
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
        <div className="eventPriceSlip">
            <div className="eventPriceSlip-eventTitleRow">
                <p>{title}</p>
                {
                    deviceType === 'mobile' &&
                    <div 
                        className="eventPriceSlip-cancelButton"
                        onClick={() => navigate('/')}
                    >
                        <img src={cancelButton} alt="cancel" />
                    </div>
                }
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