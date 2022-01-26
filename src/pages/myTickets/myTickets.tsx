import './myTickets.scss';

import heroImage from '../../assets/techno2.jpg';
import HeroImage from '../../components/heroImage/HeroImage';

const MyTicketsPage = (): JSX.Element => {

    return (
        <div className="myTicketsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="myTicketsPage-content">
                <div className="myTicketsPageContainer">
                    <div className="myTicketsPageContainer-title">
                        My Tickets
                    </div>
                    <div className="myTicketsPageContainer-events">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyTicketsPage;