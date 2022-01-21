import './thisWeekEvents.scss';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/heroImage.jpg';

const thisWeekEventsPage = (): JSX.Element => {

    return (
        <div className="thisWeekEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="thisWeekEventsPage-content">
                This Week Events
            </div>
        </div>
    );
}

export default thisWeekEventsPage;