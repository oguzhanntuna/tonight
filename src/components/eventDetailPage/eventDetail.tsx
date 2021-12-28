import './eventDetail.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import FavoriteIcon from '../favoriteIcon/favoriteIcon';

interface IEventDetailProps {
    eventData: IEventShowcaseEvent;
}

const EventDetail = (props: IEventDetailProps): JSX.Element => {
    const { eventData } = props;
    const { title, date, location, imageUrl } = eventData;

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
                <div className="eventDetail-eventInfo">
                    <div className="eventDetail-date">
                        {date}
                    </div>
                    <div className="eventDetail-location">
                        {location}
                    </div>
                    <FavoriteIcon eventToBeLiked={eventData} showFavoritesText={true} />
                </div>
            </div>
            <div className="eventDetail-about">
                <div className="eventDetail-aboutTitle">
                    About
                </div>
                <div className="eventDetail-aboutDescription">
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </span>
                </div>
            </div>
            <div className="eventDetail-rules">
                <div className="eventDetail-rulesTitle">
                    Rules
                </div>
                <div className="eventDetail-rulesDescription">
                    <span>The event is not for ages 18 and over.</span>
                    <span>Activity course instructor, it is forbidden to insert a piercing tool.</span>
                    <span>Photo and video tutorials are accepted in activity schools schools.</span>
                    <span>It can be played to set up a virtual virtual environment and be tricked to use it without written permission.</span>
                    <span>It likes to be exhibited with non-professional users, to distract the in-use and performers, and for private enjoyment. Shooting with flash is strictly prohibited.
                    Organization and event venues are deemed appropriate and have backstage coverage.
                    Care can be taken to balance the number of men and women, attitudes, clothing and generally to choose the appropriate one, and it can start from these reasons. The right to decide is at the initiative of the gate. The determinant of our gate is final and is valid in the condition.</span>
                    <span>It is considered to have passed the PCR test or test, which predicts that the selection exam within the scope of the event will vaccinate the vaccination card. It is not possible for them to enter the events that do not have a vaccination card/PCR test and they will not be able to buy tickets.</span>
                    <span>Purchased ticket (which will also not be used specifically), for advertising, competition, use for people who can benefit from the use, including promotion. The ticket used for this departure is canceled and the transaction is started.</span>
                </div>
            </div>
        </div>
    );
}

export default EventDetail;