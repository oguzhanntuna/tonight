import './recentlyAddedEvents.scss';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/heroImage.jpg';

const recentlyAddedEventsPage = (): JSX.Element => {

    return (
        <div className="recentlyAddedEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="recentlyAddedEventsPage-content">
                Recently Added Events
            </div>
        </div>
    );
}

export default recentlyAddedEventsPage;