import './buyNowEvents.scss';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/heroImage.jpg';

const BuyNowEventsPage = (): JSX.Element => {

    return (
        <div className="buyNowEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="buyNowEventsPage-content">
                Buy Now Events Page
            </div>
        </div>
    );
}

export default BuyNowEventsPage;