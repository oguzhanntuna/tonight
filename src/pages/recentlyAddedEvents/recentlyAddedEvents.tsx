import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './recentlyAddedEvents.scss';

import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as RecentlyAddedEventsActions from '../../store/actions/recentlyAddedEvents';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/hero.jpg';
import EventTicket from '../../components/eventTicket/EventTicket';
import Spinner from '../../components/spinner/spinner';
import Search from '../../components/search/search';

const RecentlyAddedEventsPage = (): JSX.Element => {
    const { events: recentlyAddedEvents, loading } = useSelector((state: IApplicationState) => state.recentlyAddedEvents);
    const [searchInput, setSearchInput] = useState<string>('');
    const dispatch = useDispatch();
    
    useScrollToTop();

    useEffect(() => {
        const { fetchRecentlyAddedEvents } = RecentlyAddedEventsActions;

        if (recentlyAddedEvents && recentlyAddedEvents.length === 0) {
            dispatch(fetchRecentlyAddedEvents());
        }
    }, [recentlyAddedEvents, dispatch]);

    const renderRecentlyAddedEvents = () => (
        recentlyAddedEvents.map((event, index) => (
            <EventTicket 
                key={`${index}-${event.id}`} 
                eventData={event} 
            />
        ))
    )

    const renderFilteredRecentlyAddedEvents = () => {
        const filteredRecentlyAddedEvents = recentlyAddedEvents.filter(event => 
            event.title.toLowerCase().includes(searchInput.toLowerCase()) || 
            event.location.toLowerCase().includes(searchInput.toLowerCase())
        );

        return filteredRecentlyAddedEvents.map((event, index) => (
            <EventTicket 
                key={`${index}-${event.id}`} 
                eventData={event} 
            />
        ))
    }

    return (
        <div className="recentlyAddedEventsPage">
            <HeroImage imageUrl={heroImage} />
            <div className="recentlyAddedEventsPage-content">
                <div className="recentlyAddedEventsContainer">
                    <div className="recentlyAddedEventsContainer-title">
                        Recently Added Events
                    </div>
                    <Search 
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                    />
                    {
                        loading
                            ? <Spinner />
                            :  (
                                <div className="recentlyAddedEventsContainer-events">
                                    { !searchInput && renderRecentlyAddedEvents() }
                                    { searchInput && renderFilteredRecentlyAddedEvents() }
                                </div>
                            ) 
                    }
                </div>
            </div>
        </div>
    );
}

export default RecentlyAddedEventsPage;