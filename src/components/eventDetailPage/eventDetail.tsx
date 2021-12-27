import './eventDetail.scss';

import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';

interface IEventDetailProps {
    data: IEventShowcaseEvent;
}

const EventDetail = (props: IEventDetailProps): JSX.Element => {
    const { data: { title, location, imageUrl } } = props;

    return (
        <div className="eventDetail"> 
            <div className="eventDetail-title">
                {title}
            </div>
            <div className="eventDetail-content">
                <div className="eventDetail-imageContainer">
                    <div className="eventDetail-imageOverlay" />
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="eventDetail-eventInfo">
                    <div className="eventDetail-date">
                        Date
                    </div>
                    <div className="eventDetail-location">
                        {location}
                    </div>
                </div>
            </div>
            <div className="eventDetail-about">
                <div className="eventDetail-aboutTitle">
                    About
                </div>
                <div className="eventDetail-aboutDescription">
                    <div className="eventDetail-aboutDescription--1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                    <div className="eventDetail-aboutDescription--2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
            </div>
            <div className="eventDetail-rules">
                <div className="eventDetail-rulesTitle">
                    Rules
                </div>
                <div className="eventDetail-rulesDescription">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        </div>
    );
}

export default EventDetail;