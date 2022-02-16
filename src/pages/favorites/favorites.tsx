import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './favorites.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as FavoritesActions from '../../store/actions/favorites';

import heroImage from '../../assets/hero.jpg'
import favoriteIcon from '../../assets/icons/heart-favorites.svg';
import HeroImage from '../../components/heroImage/HeroImage';
import EventTicket from '../../components/eventTicket/EventTicket';
import EmptyState from '../../components/emptyState/EmptyState';

const FavoritesPage = (): JSX.Element => {
    const { favoritesResetAllTickets } = FavoritesActions;
    const favoriteEvents = useSelector((state: IApplicationState) => state.favorites.favoriteEvents);
    const dispatch = useDispatch();

    useEffect(() => {

        return () => {
            dispatch(favoritesResetAllTickets());
        }
    }, [dispatch, favoritesResetAllTickets]);

    const renderFavoriteEvents = (): JSX.Element => {

        return <div className="favoriteEvents">
            {
                favoriteEvents.map((favoriteEvent, index) => (
                    <EventTicket  
                        key={`${index}-${favoriteEvent?.id}`} 
                        eventData={favoriteEvent} 
                    />
                ))
            }
        </div> 
    }

    const renderEmptyState = (): JSX.Element => (
        
        <EmptyState 
            icon={favoriteIcon}
            text="No favourites yet!"
        />
    )

    return (
        <div className="favoritesPage">
            <HeroImage imageUrl={heroImage} />
            <div className="favoritesPageContainer">
                <div className="favoritesPageContainer-title">
                    My Favorites
                </div>
                <div className="favoritesPageContainer-content">
                    {
                        favoriteEvents && favoriteEvents.length > 0
                            ? renderFavoriteEvents()
                            : renderEmptyState()
                    }
                </div>
            </div>
        </div>
    )
}

export default FavoritesPage;