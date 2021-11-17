import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EventPriceRow.scss';

import addIcon from '../../../assets/icons/add.svg';
import removeIcon from '../../../assets/icons/remove.svg';

interface IEventShowcaseEventPriceRow {
    ticketType: string;
    ticketPrice: string;
    selectedEventIdArray: Array<number | null>;
}

const EventShowcaseEventPriceRow = (props: IEventShowcaseEventPriceRow): JSX.Element => {
    const [ticketCount, setTicketCount] = useState<number>(0);
    const { ticketType, ticketPrice } = props;

    const initialState = useSelector<any>((state) => state.events.counter);
    const dispatch = useDispatch();

    console.log(initialState);
    useEffect(() => {
    }, [initialState]);

    const increaseTicketCount = (): void => setTicketCount(ticketCount + 1);
    const decreaseTicketCount = (): void  => { if (ticketCount > 0) setTicketCount(ticketCount - 1) };

    return (
        <div className="eventPriceRow">
            <div className="eventPriceRow-ticketInfoContainer">
                <div className="eventPriceRow-ticketInfo">
                    <div className="eventPriceRow-ticketType">{ticketType}</div>
                    <div className="eventPriceRow-ticketPrice">{ticketPrice}</div>
                </div>
                <div className="eventPriceRow-ticketCount">{ticketCount}</div>
            </div>
            <div className="eventPriceRow-buttonContainer">
                <div 
                    className={`eventPriceRow-removeButton ${ticketCount === 0 ? 'disable' : ''}`} 
                    onClick={() => decreaseTicketCount()}
                >
                    <img src={removeIcon} alt="remove icon" />
                </div>
                <div 
                    className="eventPriceRow-addButton" 
                    // onClick={() => increaseTicketCount()}
                    onClick={() => dispatch({ type: 'increase' })}
                >
                    <img src={addIcon} alt="add icon" />
                </div>
            </div>
        </div>
    );
}

export default EventShowcaseEventPriceRow;