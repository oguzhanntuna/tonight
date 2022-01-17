import './EventTicketPriceRow.scss';
import { useDispatch } from 'react-redux';

import { IEventShowcaseEvent, IEventShowCaseTicket } from '../../models/interfaces/eventShowcase/eventShowcase';
import * as eventActions from '../../store/actions/events';

import addIcon from '../../assets/icons/add.svg';
import removeIcon from '../../assets/icons/remove.svg';

interface IEventTicketPriceRowProps {
    eventData: IEventShowcaseEvent;
    ticketData: IEventShowCaseTicket;
}

const EventTicketPriceRow = (props: IEventTicketPriceRowProps): JSX.Element => {
    const { ticketData, eventData } = props;
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
                            ? dispatch(removeNormalTicket(eventData)) 
                            : dispatch(removeVipTicket(eventData))
                    }}
                >
                    <img src={removeIcon} alt="remove icon" />
                </button>
                <button 
                    className="eventTicketPriceRow-addButton"
                    onClick={() => {
                        type === 'normal' 
                            ? dispatch(addNormalTicket(eventData)) 
                            : dispatch(addVipTicket(eventData))
                    }}
                >
                    <img src={addIcon} alt="add icon" />
                </button>
            </div>
        </div>
    );
}

export default EventTicketPriceRow;