import { IThisWeekModuleEvent } from './Module';
import './Event.scss';

import detailIcon from '../../../assets/icons/document-text-outline.svg';
import favIcon from '../../../assets/icons/heart-outline.svg';

interface IThisWeekModuleEventProps {
    data: IThisWeekModuleEvent;
    onEventClicked(): void
}

const ThisWeekModuleEvent = (props: IThisWeekModuleEventProps): JSX.Element => {
    const { data, onEventClicked } = props;

    const goToEventDetail = (): void => {
        console.log('went to event detail');
    }

    const addToFavorites = (): void => {
        console.log('added to favorites');
    }

    return (
        <div className="event">
            <div className="event-image" style={{ backgroundImage: `url("${data.image}")` }} />
            <div className="event-imageOverlay" onClick={() => onEventClicked()} />
            <div className="event-goToDetailIcon" onClick={() => goToEventDetail()}>
                <img src={detailIcon} alt="detail icon" />
            </div>
            <div className="event-addToFavoriteIcon" onClick={() => addToFavorites()}>
                <img src={favIcon} alt="favorite icon" />
            </div>
            <div className="event-content">
                <div className="event-location">{data.location}</div>
                <div className="event-date">{data.date}</div>
                <div className="event-title">{data.title}</div>
            </div>
        </div>
    );
}

export default ThisWeekModuleEvent;