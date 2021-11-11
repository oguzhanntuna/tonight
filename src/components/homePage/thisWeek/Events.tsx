import './Events.scss';

import image from '../../../assets/Screen Shot 2021-11-09 at 4.19.30 PM.png';
import detailIcon from '../../../assets/icons/document-text-outline.svg';
import favIcon from '../../../assets/icons/heart-outline.svg';

const ThisWeekModuleEvents = (): JSX.Element => {

    return (
        <div className="eventsThisWeek">
            <div className="eventsThisWeek-eventContainer">
                <div className="eventsThisWeek-event">
                    <div className="eventsThisWeek-image" style={{ backgroundImage: `url("${image}")` }} />
                    <div className="eventsThisWeek-imageOverlay" />
                    <div className="eventsThisWeek-goToDetailIcon">
                        <img src={detailIcon} alt="detail icon" />
                    </div>
                    <div className="eventsThisWeek-addToFavoriteIcon">
                        <img src={favIcon} alt="favorite icon" />
                    </div>
                    <div className="eventsThisWeek-content">
                        <div className="eventsThisWeek-location">Klein Phönix</div>
                        <div className="eventsThisWeek-date">10 Nov 2021 Wed 18:00 - 00:00</div>
                        
                        <div className="eventsThisWeek-title">Enrico Sangiuliano</div>
                    </div>
                </div>
                <button className="eventsThisWeek-purchaseButton">Buy Now</button>
            </div>
        </div>
    );
}

export default ThisWeekModuleEvents;