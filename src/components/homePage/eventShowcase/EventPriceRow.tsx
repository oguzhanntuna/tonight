import { useDispatch } from 'react-redux';
import { IEventShowCaseTicket } from '../../../models/interfaces/eventShowcase/event';
import './EventPriceRow.scss';

import * as eventActions from '../../../store/actions/events';
import addIcon from '../../../assets/icons/add.svg';
import removeIcon from '../../../assets/icons/remove.svg';

interface IEventShowcaseEventPriceRow {
    eventId: number;
    ticketData: IEventShowCaseTicket;
}

const EventShowcaseEventPriceRow = (props: IEventShowcaseEventPriceRow): JSX.Element => {
    const { eventId, ticketData } = props;
    const { type, title, price, count } = ticketData;
    const { addNormalTicket, addVipTicket, removeNormalTicket, removeVipTicket } = eventActions;
    
    const dispatch = useDispatch();

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
                <button 
                    className={`eventPriceRow-removeButton ${count === 0 ? 'disable' : ''}`} 
                    disabled={count === 0}
                    onClick={() => {
                        type === 'normal' 
                            ? dispatch(removeNormalTicket(eventId)) 
                            : dispatch(removeVipTicket(eventId))
                    }}
                >
                    <img src={removeIcon} alt="remove icon" />
                </button>
                <button 
                    className="eventPriceRow-addButton"
                    onClick={() => {
                        type === 'normal' 
                            ? dispatch(addNormalTicket(eventId)) 
                            : dispatch(addVipTicket(eventId))
                    }}
                >
                    <img src={addIcon} alt="add icon" />
                </button>
            </div>
        </div>
    );
}

export default EventShowcaseEventPriceRow;