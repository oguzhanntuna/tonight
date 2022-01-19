import { 
    ADD_TO_FAVORITES, 
    FETCH_FAVORITES, 
    SET_LOADING, 
    FAVORITES_ADD_NORMAL_TICKET, 
    FAVORITES_ADD_VIP_TICKET, 
    FAVORITES_REMOVE_NORMAL_TICKET, 
    FAVORITES_REMOVE_VIP_TICKET, 
    REMOVE_FROM_FAVORITES, 
    FAVORITES_RESET_TICKET_COUNT,
    FAVORITES_RESET_ALL_TICKETS
} from './../actions/favorites';
import { FavoriteEvent } from '../../models/favoriteEvent/favoriteEvent';
import { IFavoritesAction } from './../../models/interfaces/store/actions/favorites';
import { IFavoritesState } from '../../models/interfaces/store/states/favorites';

const initialState: IFavoritesState = {
    favoriteEvents: [],
    loading: false
}

export const favoritesReducer = (state = initialState, action: IFavoritesAction): IFavoritesState => {
    switch(action.type) {
        case FETCH_FAVORITES:

            if (action.favoriteEvents) {

                return {
                    ...state,
                    favoriteEvents: action.favoriteEvents,
                    loading: false
                }
            }

        break;
        
        case ADD_TO_FAVORITES:
            const { selectedEvent: selectedEventToBeAdded } = action;

            if (state.favoriteEvents && selectedEventToBeAdded) {

                return {
                    ...state,
                    favoriteEvents: [ ...state.favoriteEvents, selectedEventToBeAdded ],
                    loading: false
                }
            }

            break;

        case REMOVE_FROM_FAVORITES:
            const { selectedEvent: selectedEventToBeRemoved } = action;
            const newFavoriteEvents = state.favoriteEvents.filter((favoriteEvent => favoriteEvent?.id !== selectedEventToBeRemoved?.id));

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

        case FAVORITES_ADD_NORMAL_TICKET:
            const addedNormalTicketFavoritesEvent = action.selectedEvent;
        
            if (addedNormalTicketFavoritesEvent instanceof FavoriteEvent) {

                addedNormalTicketFavoritesEvent.normalTicket.count = addedNormalTicketFavoritesEvent.normalTicket.count + 1;
                addedNormalTicketFavoritesEvent.totalPrice = addedNormalTicketFavoritesEvent.totalPrice + addedNormalTicketFavoritesEvent.normalTicket.price;

                return {
                    ...state,
                    favoriteEvents: [ ...state.favoriteEvents ]
                }
            }

            break;  
            
        case FAVORITES_ADD_VIP_TICKET:
            const addedVipTicketFavoritesEvent = action.selectedEvent;
        
            if (addedVipTicketFavoritesEvent instanceof FavoriteEvent) {

                addedVipTicketFavoritesEvent.vipTicket.count = addedVipTicketFavoritesEvent.vipTicket.count + 1;
                addedVipTicketFavoritesEvent.totalPrice = addedVipTicketFavoritesEvent.totalPrice + addedVipTicketFavoritesEvent.vipTicket.price;

                return {
                    ...state,
                    favoriteEvents: [ ...state.favoriteEvents ]
                }
            }

            break;  
        
        case FAVORITES_REMOVE_NORMAL_TICKET:
            const removedNormalTicketFavoritesEvent = action.selectedEvent;
        
            if (removedNormalTicketFavoritesEvent instanceof FavoriteEvent) {

                removedNormalTicketFavoritesEvent.normalTicket.count = removedNormalTicketFavoritesEvent.normalTicket.count - 1;
                removedNormalTicketFavoritesEvent.totalPrice = removedNormalTicketFavoritesEvent.totalPrice - removedNormalTicketFavoritesEvent.normalTicket.price;

                return {
                    ...state,
                    favoriteEvents: [ ...state.favoriteEvents ]
                }
            }

            break;  

        case FAVORITES_REMOVE_VIP_TICKET:
            const removedVipTicketFavoritesEvent = action.selectedEvent;
        
            if (removedVipTicketFavoritesEvent instanceof FavoriteEvent) {

                removedVipTicketFavoritesEvent.vipTicket.count = removedVipTicketFavoritesEvent.vipTicket.count - 1;
                removedVipTicketFavoritesEvent.totalPrice = removedVipTicketFavoritesEvent.totalPrice - removedVipTicketFavoritesEvent.vipTicket.price;

                return {
                    ...state,
                    favoriteEvents: [ ...state.favoriteEvents ]
                }
            }

            break;  

        case FAVORITES_RESET_TICKET_COUNT:
            const favoritesEventAddedToCart = action.selectedEvent;

            if (favoritesEventAddedToCart instanceof FavoriteEvent) {
                favoritesEventAddedToCart.totalPrice = 0;
                favoritesEventAddedToCart.normalTicket.count = 0;
                favoritesEventAddedToCart.vipTicket.count = 0;

                return {
                    ...state,
                    favoriteEvents: [ ...state.favoriteEvents ]
                }
            }

            // Event added to cart could not found!
            break;

        case FAVORITES_RESET_ALL_TICKETS:
            const { favoriteEvents } = state;

            favoriteEvents.forEach(favoriteEvent => {
                favoriteEvent.totalPrice = 0;
                favoriteEvent.normalTicket.count = 0;
                favoriteEvent.vipTicket.count = 0;
            });

            return {
                ...state,
                favoriteEvents: [ ...state.favoriteEvents ]
            }
    }

    return state;
}

