import './Event.scss';
import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';

import detailIcon from '../../../assets/icons/document-text-outline.svg';
import favIcon from '../../../assets/icons/heart-outline.svg';

interface IEventShowcaseEventProps {
    eventData: IEventShowcaseEvent;
    onEventClicked(): void
}

const EventShowcaseEvent = (props: IEventShowcaseEventProps): JSX.Element => {
    const { eventData, onEventClicked } = props;

    const goToEventDetail = (): void => {
        console.log('went to event detail');
    }

    const addToFavorites = (): void => {
        console.log('added to favorites');
    }

    return (
        <div className="event">
            <div className="event-image" style={{ backgroundImage: `url("${eventData.image}")` }} />
            <div className="event-imageOverlay" onClick={() => onEventClicked()} />
            <div className="event-goToDetailIcon" onClick={() => goToEventDetail()}>
                <img src={detailIcon} alt="detail icon" />
            </div>
            <div className="event-addToFavoriteIcon" onClick={() => addToFavorites()}>
                <img src={favIcon} alt="favorite icon" />
            </div>
            <div className="event-content">
                <div className="event-location">{eventData.location}</div>
                <div className="event-date">{eventData.date}</div>
                <div className="event-title">{eventData.title}</div>
            </div>
        </div>
    );
}

export default EventShowcaseEvent;