import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './buyNowEvents.scss';

import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as BuyNowEventsActions from '../../store/actions/buyNowEvents';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/hero.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';
import Spinner from '../../components/spinner/spinner';
import Search from '../../components/search/search';

const BuyNowEventsPage = (): JSX.Element => {
    const { events: buyNowEvents, loading } = useSelector((state: IApplicationState) => state.buyNowEvents);
    const [searchInput, setSearchInput] = useState<string>('');
    const dispatch = useDispatch();

    useScrollToTop();

    useEffect(() => {
        const { fetchBuyNowEvents } = BuyNowEventsActions;

        if (buyNowEvents && buyNowEvents.length === 0) {
            dispatch(fetchBuyNowEvents());
        }
    }, [buyNowEvents, dispatch]);

    const renderBuyNowEvents = () => (
        buyNowEvents.map((event, index) => (
            <EventTicket 
                key={`${index}-${event.id}`} 
                eventData={event} 
            />
        ))
    )

    const renderFilteredBuyNowEvents = () => {
        const filteredBuyNowEvents = buyNowEvents.filter(event => 
            event.title.toLowerCase().includes(searchInput) || 
            event.location.toLowerCase().includes(searchInput)
        );

        return filteredBuyNowEvents.map((event, index) => (
            <EventTicket 
                key={`${index}-${event.id}`} 
                eventData={event} 
            />
        ))
    }

    return (
        <div className="buyNowEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="buyNowEventsPage-content">
                <div className="buyNowEventsContainer">
                    <div className="buyNowEventsContainer-title">
                        Buy Now Events
                    </div>
                    <Search 
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                    />
                    {
                        loading
                            ? <Spinner />
                            : (
                                <div className="buyNowEventsContainer-events">
                                    { !searchInput && renderBuyNowEvents() }
                                    { searchInput && renderFilteredBuyNowEvents() }
                                </div>
                            ) 
                    }
                </div>
            </div>
        </div>
    );
}

export default BuyNowEventsPage;