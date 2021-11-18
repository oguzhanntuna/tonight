import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IEventShowCaseTicket } from '../../../models/interfaces/eventShowcase/event';
import './EventPriceRow.scss';

import addIcon from '../../../assets/icons/add.svg';
import removeIcon from '../../../assets/icons/remove.svg';

interface IEventShowcaseEventPriceRow {
    eventId: number;
    data: IEventShowCaseTicket;
    selectedEventIdArray: Array<number | null>;
}

const EventShowcaseEventPriceRow = (props: IEventShowcaseEventPriceRow): JSX.Element => {
    const { eventId, data } = props;
    const { type, title, price, count } = data;
    const [ticketCount, setTicketCount] = useState<number>(count);
    // const initialState = useSelector<any>((state) => state.events.availableEvents);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log(initialState);
    // }, [initialState]);

    const increaseTicketCount = (): void => setTicketCount(ticketCount + 1);
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
                    // onClick={() => increaseTicketCount()}
                    onClick={() => dispatch({ type: 'increase', eventId: eventId, ticketType: type, ticketCount: count})}
                >
                    <img src={addIcon} alt="add icon" />
                </div>
            </div>
        </div>
    );
}

export default EventShowcaseEventPriceRow;