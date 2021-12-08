import './EventTicketPriceRow.scss';
import { useDispatch } from 'react-redux';

import { IEventShowCaseTicket } from '../../models/interfaces/eventShowcase/event';
import * as eventActions from '../../store/actions/events';

import addIcon from '../../assets/icons/add.svg';
import removeIcon from '../../assets/icons/remove.svg';

interface IEventTicketPriceRowProps {
    eventId: number;
    ticketData: IEventShowCaseTicket;
}

const EventTicketPriceRow = (props: IEventTicketPriceRowProps): JSX.Element => {
    const { eventId, ticketData } = props;
    const { type, title, price, count } = ticketData;
    const { addNormalTicket, addVipTicket, removeNormalTicket, removeVipTicket } = eventActions;
    
    const dispatch = useDispatch();

    return (
        <div className="eventTicketPriceRow">
            <div className="eventTicketPriceRow-ticketInfoContainer">
                <div className="eventTicketPriceRow-ticketInfo">
                    <div className="eventTicketPriceRow-ticketType">{title}</div>
                    <div className="eventTicketPriceRow-ticketPrice">{price}$</div>
                </div>
                <div className="eventTicketPriceRow-ticketCount">{count}</div>
            </div>
            <div className="eventTicketPriceRow-buttonContainer">
                <button 
                    className={`eventTicketPriceRow-removeButton ${count === 0 ? 'disable' : ''}`} 
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
                    className="eventTicketPriceRow-addButton"
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

export default EventTicketPriceRow;