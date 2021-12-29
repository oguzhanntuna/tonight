import { useNavigate } from 'react-router-dom';
import './EventTicketInfoSide.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';

import detailIcon from '../../assets/icons/document-text-outline.svg';
import FavoriteIcon from '../favoriteIcon/favoriteIcon';

interface IEventTicketFrontSideProps {
    eventData: IEventShowcaseEvent;
    toggleTicketSide: () => void;
}

const EventTicketFrontside = (props: IEventTicketFrontSideProps): JSX.Element => {
    const { eventData, toggleTicketSide } = props;
    
    const navigate = useNavigate();

    const goToEventDetail = (): void => {
        const { url } = eventData;
        
        navigate(`/events/${url}`);
    }

    return (
        <div className="eventTicketInfoSide">
            <div 
                className="eventTicketInfoSide-image" 
                style={{ backgroundImage: `url("${eventData.imageUrl}")` }} 
            />
            <div 
                className="eventTicketInfoSide-imageOverlay" 
                onClick={() => toggleTicketSide()} 
            />
            <div 
                className="eventTicketInfoSide-goToDetailIcon" 
                onClick={() => goToEventDetail()}
            >
                <img src={detailIcon} alt="detail icon" />
            </div>
            <FavoriteIcon 
                eventToBeLiked={eventData}
                showFavoritesText={false} 
            />
            <div 
                className="eventTicketInfoSide-content" 
                onClick={() => toggleTicketSide()}
            >
                <div className="eventTicketInfoSide-location">{eventData.location}</div>
                <div className="eventTicketInfoSide-date">{eventData.date}</div>
                <div className="eventTicketInfoSide-title">{eventData.title}</div>
            </div>
        </div>
    );
}

export default EventTicketFrontside;