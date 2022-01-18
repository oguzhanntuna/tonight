import { useDispatch, useSelector } from 'react-redux';
import './favoriteIcon.scss';

import * as FavoritesActions from '../../store/actions/favorites';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/eventShowcase';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import favIconEmpty from '../../assets/icons/heart-outline.svg';
import favIconFull from '../../assets/icons/heart-full.svg';

interface IFavoriteIcon {
    eventToBeLiked: IEventShowcaseEvent;
    showFavoritesText: boolean;
}

const FavoriteIcon = (props: IFavoriteIcon): JSX.Element => {
    const { eventToBeLiked, showFavoritesText } = props;
    const { toggleFavorite } = FavoritesActions;

    const dispatch = useDispatch();
    const favoritesState = useSelector((state: IApplicationState) => state.favorites);
    const { favoriteEvents, loading } = favoritesState;

    console.log(loading);

    const isEventAlreadyInFavorites = favoriteEvents ? favoriteEvents.some(favoriteEvent => favoriteEvent?.id === eventToBeLiked.id) : false;

    return (
        <div className="addToFavoriteIconContainer" onClick={() => !loading && dispatch(toggleFavorite(eventToBeLiked))}>
            <div className="addToFavoriteIconContainer-addToFavoriteIcon">
                { 
                    isEventAlreadyInFavorites 
                        ? <img src={favIconFull} alt="full favorite icon" /> 
                        : <img src={favIconEmpty} alt="empty favorite icon" /> 
                }
            </div>
            { showFavoritesText && <span className="addToFavoriteIconContainer-favouritesText">Add To Favorites</span> }
        </div>
    );
}

export default FavoriteIcon;