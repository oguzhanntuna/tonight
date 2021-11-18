import './EventPriceContainer.scss';
import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';

import EventShowcaseEventPriceRow from './EventPriceRow';
import returnBackIcon from '../../../assets/icons/return-back.svg';
interface IEventShowcaseEventPriceContainerProps {
    data: IEventShowcaseEvent;
    selectedEventIdArray: Array<number | null>;
    onReturnBackButtonClicked(): void
}

const EventShowcaseEventPriceContainer = (props: IEventShowcaseEventPriceContainerProps): JSX.Element => {
    const { data, selectedEventIdArray, onReturnBackButtonClicked } = props;
    const { id, title, normalTicket, vipTicket } = data;

    return (
        <div className="eventPriceContainer">
            <div className="eventPriceContainer-header">
                <div className="eventPriceContainer-eventTitle">{title}</div>
                <div className="eventPriceContainer-returnBackIcon" onClick={() => onReturnBackButtonClicked()}>
                    <img src={returnBackIcon} alt="return back icon" />
                </div>
            </div>
            <div className="eventPriceContainer-content">
                <EventShowcaseEventPriceRow 
                    data={normalTicket} 
                    eventId={id}
                    selectedEventIdArray={selectedEventIdArray}
                />
                <EventShowcaseEventPriceRow 
                    data={vipTicket} 
                    eventId={id}
                    selectedEventIdArray={selectedEventIdArray}
                />
            </div>
            <div className="eventPriceContainer-totalPrice">Total: 0$</div>
        </div> 
    );
}

export default EventShowcaseEventPriceContainer;