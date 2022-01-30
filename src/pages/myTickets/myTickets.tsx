import './myTickets.scss';

import heroImage from '../../assets/techno2.jpg';
import HeroImage from '../../components/heroImage/HeroImage';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import { useEffect } from 'react';

const MyTicketsPage = (): JSX.Element => {
    const myTickets = useSelector((state: IApplicationState) => state.myTickets.myTickets);

    useEffect(() => {
        console.log('myTicketsState: ', myTickets);
    }, [myTickets]);

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