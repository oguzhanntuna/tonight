import { useDispatch } from 'react-redux';
import './EventPriceContainer.scss';

import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';
import * as eventActions from '../../../store/actions/events';

import EventShowcaseEventPriceRow from './EventPriceRow';
import returnBackIcon from '../../../assets/icons/return-back.svg';
interface IEventShowcaseEventPriceContainerProps {
    eventData: IEventShowcaseEvent;
}

const EventShowcaseEventPriceContainer = (props: IEventShowcaseEventPriceContainerProps): JSX.Element => {
    const { eventData } = props;
    const { id, title, normalTicket, vipTicket, totalPrice } = eventData;
    const { setEventInactive } = eventActions;

    const dispatch = useDispatch();

    return (
        <div className="eventPriceContainer">
            <div className="eventPriceContainer-header">
                <div className="eventPriceContainer-eventTitle">{title}</div>
                <div className="eventPriceContainer-returnBackIcon" onClick={() => dispatch(setEventInactive(eventData.id))}>
                    <img src={returnBackIcon} alt="return back icon" />
                </div>
            </div>
            <div className="eventPriceContainer-content">
                <EventShowcaseEventPriceRow 
                    ticketData={normalTicket} 
                    eventId={id}
                />
                <EventShowcaseEventPriceRow 
                    ticketData={vipTicket} 
                    eventId={id}
                />
            </div>
            <div className="eventPriceContainer-totalPrice">{`Total: ${totalPrice}$`}</div>
        </div> 
    );
}

export default EventShowcaseEventPriceContainer;