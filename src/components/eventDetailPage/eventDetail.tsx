import './EventDetail.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import FavoriteIcon from '../favoriteIcon/FavoriteIcon';

interface IEventDetailProps {
    eventData: IEventShowcaseEvent;
}

const EventDetail = (props: IEventDetailProps): JSX.Element => {
    const { eventData } = props;
    const { title, date, location, imageUrl, description } = eventData;

    return (
        <div className="eventDetail"> 
            <div className="eventDetail-title">
                <span>{title}</span>
            </div>
            <div className="eventDetail-content">
                <div className="eventDetail-imageContainer">
                    <div className="eventDetail-imageOverlay" />
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="eventDetail-contentBottomRow">
                    <div className="eventDetail-eventInfo">
                        <div className="eventDetail-date">
                            {date}
                        </div>
                        <div className="eventDetail-location">
                            {location}
                        </div>
                    </div>
                    <FavoriteIcon eventToBeLiked={eventData} showFavoritesText={true} />
                </div>
            </div>
            <div className="eventDetail-about">
                <div className="eventDetail-aboutTitle">
                    About
                </div>
                <div className="eventDetail-aboutDescription">
                    {
                        description.map(description => (
                            <span>
                                { description }
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className="eventDetail-rules">
                <div className="eventDetail-rulesTitle">
                    Rules
                </div>
                <div className="eventDetail-rulesDescription">
                    <span>The event is for participants aged 18 and over.</span>
                    <span>It is forbidden to bring food and drink, sharp, piercing or flammable tools into the event area.</span>
                    <span>Event participants agree that photo and video shooting will be done in the event area.</span>
                    <span>It is forbidden to insert professional video recorders and shoot without written permission.</span>
                    <span>It is expected to not disturb other guests and performing artists and violate the privacy of his private life with non-professional devices. Shooting with flash is strictly prohibited.</span>
                    <span>Organization and venue officials have the right not to let people they deem unsuitable to the event and backstage area.</span>
                    <span>Particular attention is paid to the balance in the number of men and women, their attitude, style, clothing, and suitability in general, and entry may not be possible due to these and similar reasons. The decision of this is entirely at the initiative of the door. The decision of our door is final and is valid under all conditions.</span>
                    <span>Our guests are required to have their vaccination card or HES code with them when they come to the event area. Participants who do not have a vaccination card/HES code will not be able to enter the event area and tickets will not be refunded.</span>
                    <span>The purchased ticket may not be used for commercial or non-commercial purposes other than personal use, including but not limited to advertising, contests, sweepstakes, promotions (unless specifically written permission is obtained). The ticket used for these purposes is canceled and legal action is started.</span>
                    <span>No refunds, cancellations or exchanges can be made on purchased tickets.</span>
                </div>
            </div>
        </div>
    );
}

export default EventDetail;