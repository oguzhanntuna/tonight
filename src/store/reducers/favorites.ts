import { IFavoritesAction } from './../../models/interfaces/store/actions/favorites';
import { IFavoritesState } from '../../models/interfaces/store/states/favorites';

import { SET_LOADING, TOGGLE_FAVORITE } from '../actions/favorites';

const initialState: IFavoritesState = {
    favoriteEvents: [],
    loading: false
}

export const favoritesReducer = (state = initialState, action: IFavoritesAction): IFavoritesState => {
    switch(action.type) {
        case TOGGLE_FAVORITE:
            const { addedEvent } = action;

            if (state.favoriteEvents.length > 0) {
                const { favoriteEvents } = state;
                const isEventAlreadyInFavorites = favoriteEvents.some(favoriteEvent => favoriteEvent?.id === addedEvent.id);

                if (isEventAlreadyInFavorites) {
                    
                    return {
                        ...state,
                        favoriteEvents: [ ...favoriteEvents.filter((favoriteEvent => favoriteEvent?.id !== addedEvent.id))],
                        loading: false
                    }
                }
            }

            return {
                ...state,
                favoriteEvents: [ ...state.favoriteEvents, addedEvent ],
                loading: false
            }

        case SET_LOADING: 

            return {
                ...state,
                loading: true
            }
    }

    return state;
}

