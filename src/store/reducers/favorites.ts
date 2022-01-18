import { ADD_TO_FAVORITES, FETCH_FAVORITES, REMOVE_FROM_FAVORITES, SET_LOADING } from './../actions/favorites';
import { IFavoritesAction } from './../../models/interfaces/store/actions/favorites';
import { IFavoritesState } from '../../models/interfaces/store/states/favorites';

const initialState: IFavoritesState = {
    favoriteEvents: [],
    loading: false
}

export const favoritesReducer = (state = initialState, action: IFavoritesAction): IFavoritesState => {
    switch(action.type) {
        case FETCH_FAVORITES:

            return {
                ...state,
                favoriteEvents: action.favoriteEvents,
                loading: false
            }
        
        case ADD_TO_FAVORITES:
            const { selectedEvent: selectedEventToBeAdded } = action;

            return {
                ...state,
                favoriteEvents: [ ...state.favoriteEvents, selectedEventToBeAdded ],
                loading: false
            }

        case REMOVE_FROM_FAVORITES:
            const { selectedEvent: selectedEventToBeRemoved } = action;
            const newFavoriteEvents = state.favoriteEvents.filter((favoriteEvent => favoriteEvent?.id !== selectedEventToBeRemoved.id));

            return {
                ...state,
                favoriteEvents: [ ...newFavoriteEvents ],
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

