import { useDispatch, useSelector } from 'react-redux';
import './favorites.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as FavoritesActions from '../../store/actions/favorites';

import HeroImage from '../../components/heroImage/HeroImage';
import heroImage from '../../assets/heroImage.jpg'
import EventTicket from '../../components/eventTicket/EventTicket';
import { useEffect } from 'react';

const FavoritesPage = (): JSX.Element => {
    const { favoritesResetAllTickets } = FavoritesActions;
    const favoriteEvents = useSelector((state: IApplicationState) => state.favorites.favoriteEvents);
    const dispatch = useDispatch();

    useEffect(() => {

        return () => {
            dispatch(favoritesResetAllTickets());
        }
    }, [dispatch, favoritesResetAllTickets]);

    const renderFavoriteEvents = (): Array<JSX.Element> => {

        return favoriteEvents.map((favoriteEvent, index) => (
            <EventTicket  
                key={`${index}-${favoriteEvent?.id}`} 
                eventData={favoriteEvent} 
            />
        ));
    }

    const renderEmptyState = (): JSX.Element => (
        <div className="favoritesPageContainer-emptyState">
            Empty State
        </div>
    )

    return (
        <div className="favoritesPage">
            <HeroImage imageUrl={heroImage} />
            <div className="favoritesPage-content">
                <div className="favoritesPageContainer">
                    <div className="favoritesPageContainer-title">
                        My Favorites
                    </div>
                    <div className="favoritesPageContainer-favoriteEvents">
                        {
                            favoriteEvents && favoriteEvents.length > 0
                                ? renderFavoriteEvents()
                                : renderEmptyState()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoritesPage;