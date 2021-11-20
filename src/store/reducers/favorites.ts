import { TOGGLE_FAVORITES } from '../actions/favorites';
import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/event";

interface IFavoritesState {
    favoriteEvents: Array<IEventShowcaseEvent | undefined>;
}

const initialState: IFavoritesState = {
    favoriteEvents: []
}

export const favoritesReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case TOGGLE_FAVORITES:
            const addedEvent: IEventShowcaseEvent = action.addedEvent;

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

