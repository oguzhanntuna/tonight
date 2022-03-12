import { useSelector } from 'react-redux';
import './favorites.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';

import heroImage from '../../assets/hero.jpg'
import favoriteIcon from '../../assets/icons/heart/heart-favorites.svg';
import HeroImage from '../../components/heroImage/HeroImage';
import EventTicket from '../../components/eventTicket/EventTicket';
import EmptyState from '../../components/emptyState/EmptyState';
import Spinner from '../../components/spinner/spinner';

const FavoritesPage = (): JSX.Element => {
    const favoritesState = useSelector((state: IApplicationState) => state.favorites);
    const { favoriteEvents, fetchLoading } = favoritesState;

    const renderFavoriteEvents = (): JSX.Element => (
        <div className="favoriteEvents">
            {
                favoriteEvents.map((favoriteEvent, index) => (
                    <EventTicket  
                        key={`${index}-${favoriteEvent?.id}`} 
                        eventData={favoriteEvent} 
                    />
                ))
            }
        </div> 
    );

    const renderEmptyState = (): JSX.Element => (
        
        <EmptyState 
            icon={favoriteIcon}
            text="No favourites yet!"
        />
    );

    return (
        <div className="favoritesPage">
            <HeroImage imageUrl={heroImage} />
            <div className="favoritesPageContainer">
                <div className="favoritesPageContainer-title">
                    My Favorites
                </div>
                <div className="favoritesPageContainer-content">
                    {
                        fetchLoading
                            ? <Spinner />
                            : favoriteEvents && favoriteEvents.length > 0
                                ? renderFavoriteEvents()
                                : renderEmptyState()
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default FavoritesPage;