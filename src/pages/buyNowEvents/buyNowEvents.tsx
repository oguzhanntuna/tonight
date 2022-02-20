import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './buyNowEvents.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as BuyNowEventsActions from '../../store/actions/buyNowEvents';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/hero.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';

const BuyNowEventsPage = (): JSX.Element => {
    const { events: buyNowEvents, loading } = useSelector((state: IApplicationState) => state.buyNowEvents);
    const dispatch = useDispatch();

    useScrollToTop();

    useEffect(() => {
        const { fetchBuyNowEvents } = BuyNowEventsActions;

        if (buyNowEvents && buyNowEvents.length === 0 && !loading) {
            dispatch(fetchBuyNowEvents());
        }
    }, [buyNowEvents, loading, dispatch]);

    return (
        <div className="buyNowEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="buyNowEventsPage-content">
                <div className="buyNowEventsContainer">
                    <div className="buyNowEventsContainer-title">
                        Buy Now Events
                    </div>
                    {
                        loading
                            ? <p>Loading...</p>
                            : (
                                <div className="buyNowEventsContainer-events">
                                    { 
                                        buyNowEvents.map((event, index) => (
                                            <EventTicket 
                                                key={`${index}-${event.id}`} 
                                                eventData={event} 
                                            />
                                        )) 
                                    }
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default BuyNowEventsPage;