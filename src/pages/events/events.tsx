import './events.scss';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';

const EventsPage = (): JSX.Element => {

    return (
        <div className="eventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="eventsPage-content">
                Events Page
            </div>
        </div>
    );
}

export default EventsPage;