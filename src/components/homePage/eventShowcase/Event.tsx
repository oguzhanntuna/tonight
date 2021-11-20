import { useDispatch, useSelector } from 'react-redux';
import './Event.scss';
import { IEventShowcaseEvent } from '../../../models/interfaces/eventShowcase/event';

import * as favoritesActions from '../../../store/actions/favorites';
import detailIcon from '../../../assets/icons/document-text-outline.svg';
import favIconEmpty from '../../../assets/icons/heart-outline.svg';
import favIconFull from '../../../assets/icons/heart-full.svg';

interface IEventShowcaseEventProps {
    eventData: IEventShowcaseEvent;
    onEventClicked(): void
}

const EventShowcaseEvent = (props: IEventShowcaseEventProps): JSX.Element => {
    const { eventData, onEventClicked } = props;

    const favoriteEvents = useSelector((state: any) => state.favorites.favoriteEvents);
    const dispatch = useDispatch();

    const isEventAlreadyInFavorites = favoriteEvents.some((event: any) => event?.id === eventData.id);

    const goToEventDetail = (): void => {
        console.log('went to event detail');
    }

    return (
        <div className="event">
            <div className="event-image" style={{ backgroundImage: `url("${eventData.image}")` }} />
            <div className="event-imageOverlay" onClick={() => onEventClicked()} />
            <div className="event-goToDetailIcon" onClick={() => goToEventDetail()}>
                <img src={detailIcon} alt="detail icon" />
            </div>
            <div className="event-addToFavoriteIcon" onClick={() => dispatch(favoritesActions.toggleFavorites(eventData))}>
                { 
                    isEventAlreadyInFavorites 
                        ? <img src={favIconFull} alt="full favorite icon" /> 
                        : <img src={favIconEmpty} alt="empty favorite icon" /> 
                }
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