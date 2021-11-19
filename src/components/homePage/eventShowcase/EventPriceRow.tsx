import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IEventShowCaseTicket } from '../../../models/interfaces/eventShowcase/event';
import './EventPriceRow.scss';

import * as eventActions from '../../../store/actions/events';
import addIcon from '../../../assets/icons/add.svg';
import removeIcon from '../../../assets/icons/remove.svg';

interface IEventShowcaseEventPriceRow {
    eventId: number;
    ticketData: IEventShowCaseTicket;
    selectedEventIdArray: Array<number | null>;
}

const EventShowcaseEventPriceRow = (props: IEventShowcaseEventPriceRow): JSX.Element => {
    const { eventId, ticketData } = props;
    const { type, title, price, count } = ticketData;
    const [ticketCount, setTicketCount] = useState<number>(count);
    const dispatch = useDispatch();

    const decreaseTicketCount = (): void  => { if (ticketCount > 0) setTicketCount(ticketCount - 1) };

    return (
        <div className="eventPriceRow">
            <div className="eventPriceRow-ticketInfoContainer">
                <div className="eventPriceRow-ticketInfo">
                    <div className="eventPriceRow-ticketType">{title}</div>
                    <div className="eventPriceRow-ticketPrice">{price}$</div>
                </div>
                <div className="eventPriceRow-ticketCount">{count}</div>
            </div>
            <div className="eventPriceRow-buttonContainer">
                <div 
                    className={`eventPriceRow-removeButton ${count === 0 ? 'disable' : ''}`} 
                    onClick={() => decreaseTicketCount()}
                >
                    <img src={removeIcon} alt="remove icon" />
                </div>
                <div 
                    className="eventPriceRow-addButton" 
                    onClick={() => {
                        type === 'normal' 
                            ? dispatch(eventActions.addNormalTicket(eventId)) 
                            : dispatch(eventActions.addVipTicket(eventId))
                    }}
                >
                    <img src={addIcon} alt="add icon" />
                </div>
            </div>
        </div>
    );
}

export default EventShowcaseEventPriceRow;