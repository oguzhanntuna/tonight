import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './EventTicketInfoSide.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import * as eventActions from '../../store/actions/events';
import * as favoritesActions from '../../store/actions/favorites';

import detailIcon from '../../assets/icons/document-text-outline.svg';
import favIconEmpty from '../../assets/icons/heart-outline.svg';
import favIconFull from '../../assets/icons/heart-full.svg';

interface IEventTicketFrontSideProps {
    eventData: IEventShowcaseEvent;
}

const EventTicketFrontside = (props: IEventTicketFrontSideProps): JSX.Element => {
    const { eventData } = props;
    const { setEventActive } = eventActions;
    const { toggleFavorites } = favoritesActions;
    
    const favoriteEvents = useSelector((state: IApplicationState) => state.favorites.favoriteEvents);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isEventAlreadyInFavorites = favoriteEvents.some((event: any) => event?.id === eventData.id);

    const goToEventDetail = (): void => {
        const { url } = eventData;
        
        navigate(`/events/${url}`);
    }

    return (
        <div className="eventTicketInfoSide">
            <div className="eventTicketInfoSide-image" style={{ backgroundImage: `url("${eventData.imageUrl}")` }} />
            <div className="eventTicketInfoSide-imageOverlay" onClick={() => dispatch(setEventActive(eventData.id))} />
            <div className="eventTicketInfoSide-goToDetailIcon" onClick={() => goToEventDetail()}>
                <img src={detailIcon} alt="detail icon" />
            </div>
            <div className="eventTicketInfoSide-addToFavoriteIcon" onClick={() => dispatch(toggleFavorites(eventData))}>
                { 
                    isEventAlreadyInFavorites 
                        ? <img src={favIconFull} alt="full favorite icon" /> 
                        : <img src={favIconEmpty} alt="empty favorite icon" /> 
                }
            </div>
            <div className="eventTicketInfoSide-content" onClick={() => dispatch(setEventActive(eventData.id))}>
                <div className="eventTicketInfoSide-location">{eventData.location}</div>
                <div className="eventTicketInfoSide-date">{eventData.date}</div>
                <div className="eventTicketInfoSide-title">{eventData.title}</div>
            </div>
        </div>
    );
}

export default EventTicketFrontside;