import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './buyNowEvents.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as EventActions from '../../store/actions/events';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/hero.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';

const BuyNowEventsPage = (): JSX.Element => {
    const { fetchBuyNowEvents } = EventActions;
    const buyNowEvents = useSelector((state: IApplicationState) => state.events.buyNowEvents);
    const dispatch = useDispatch();

    useScrollToTop();

    useEffect(() => {

        if (buyNowEvents && buyNowEvents.length === 0) {
            dispatch(fetchBuyNowEvents());
        }
    }, [buyNowEvents, dispatch, fetchBuyNowEvents]);

    return (
        <div className="buyNowEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="buyNowEventsPage-content">
                <div className="buyNowEventsContainer">
                    <div className="buyNowEventsContainer-title">
                        Buy Now Events
                    </div>
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
                </div>
            </div>
        </div>
    );
}

export default BuyNowEventsPage;