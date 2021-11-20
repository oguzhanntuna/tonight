import { IFavoritesAction } from './../../models/interfaces/store/actions/favorites';
import { IFavoritesState } from '../../models/interfaces/store/states/favorites';

import { TOGGLE_FAVORITES } from '../actions/favorites';

const initialState: IFavoritesState = {
    favoriteEvents: []
}

export const favoritesReducer = (state = initialState, action: IFavoritesAction): IFavoritesState => {
    switch(action.type) {
        case TOGGLE_FAVORITES:
            const addedEvent = action.addedEvent;

            if (state.favoriteEvents.length > 0) {
                const isEventAlreadyInFavorites = state.favoriteEvents.some(event => event?.id === addedEvent.id);

                if (isEventAlreadyInFavorites) {
                    
                    return {
                        ...state,
                        favoriteEvents: [ ...state.favoriteEvents.filter((event => event?.id !== addedEvent.id))]
                    }
                }
            }

            return {
                ...state,
                favoriteEvents: [ ...state.favoriteEvents, addedEvent ]
            }
    }

    return state;
}

