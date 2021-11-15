
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

    return (
        <div className="eventPriceContainer">
            <div className="eventPriceContainer-header">
                <div className="eventPriceContainer-eventTitle">{data.title}</div>
                <div className="eventPriceContainer-returnBackIcon" onClick={() => onReturnBackButtonClicked()}>
                    <img src={returnBackIcon} alt="return back icon" />
                </div>
            </div>
            <div className="eventPriceContainer-content">
                <EventShowcaseEventPriceRow 
                    ticketType="2. Dönem" 
                    ticketPrice={data.price} 
                    selectedEventIdArray={selectedEventIdArray}
                />
                <EventShowcaseEventPriceRow 
                    ticketType="Backstage" 
                    ticketPrice={data.price} 
                    selectedEventIdArray={selectedEventIdArray}
                />
            </div>
            <div className="eventPriceContainer-totalPrice">Total: 0$</div>
        </div> 
    );
}

export default EventShowcaseEventPriceContainer;