import { 
    FAVORITES_ADD_NORMAL_TICKET, 
    FAVORITES_ADD_VIP_TICKET, 
    FAVORITES_REMOVE_NORMAL_TICKET, 
    FAVORITES_REMOVE_VIP_TICKET, 
    FAVORITES_RESET_TICKETS,
    FAVORITES_FETCH_START,
    FAVORITES_FETCH_SUCCESS,
    FAVORITES_FETCH_FAIL,
    FAVORITES_TOGGLE_START,
    FAVORITES_TOGGLE_SUCCESS,
    FAVORITES_TOGGLE_FAIL
} from './../actions/favorites';
import { FavoriteEvent } from '../../models/favoriteEvent/favoriteEvent';
import { IFavoritesAction } from './../../models/interfaces/store/actions/favorites';
import { IFavoritesState } from '../../models/interfaces/store/states/favorites';

const initialState: IFavoritesState = {
    favoriteEvents: [],
    fetchLoading: false,
    toggleLoading: false,
    fetchError: null,
    toggleError: null
}

export const favoritesReducer = (state = initialState, action: IFavoritesAction): IFavoritesState => {
    switch(action.type) {
        case FAVORITES_FETCH_START:

            return {
                ...state,
                fetchLoading: true
            }

        case FAVORITES_FETCH_SUCCESS:
            const { favoriteEvents } = action;

            if (favoriteEvents) {

                return {
                    ...state,
                    favoriteEvents,
                    fetchLoading: false,
                    fetchError: null
                }
            }

            break;


        case FAVORITES_FETCH_FAIL:
            if (action.error) {
                
                return {
                    ...state,
                    fetchError: action.error,
                    fetchLoading: false
                }
            }

            break;

        case FAVORITES_TOGGLE_START:

            return {
                ...state,
                toggleLoading: true
            }

        case FAVORITES_TOGGLE_SUCCESS:
            const { selectedEvent, toggleType } = action;

            if (selectedEvent) {
                if (toggleType === 'add') {
    
                    return {
                        ...state,
                        favoriteEvents: [ ...state.favoriteEvents, selectedEvent ],
                        toggleLoading: false,
                        toggleError: null
                    }
                }
    
                if (toggleType === 'remove') {
                    const newFavoriteEvents = state.favoriteEvents.filter((favoriteEvent => favoriteEvent?.id !== selectedEvent?.id));
    
                    return {
                        ...state,
                        favoriteEvents: [ ...newFavoriteEvents ],
                        toggleLoading: false,
                        toggleError: null
                    }
                }
            }

            break;
    
        case FAVORITES_TOGGLE_FAIL:
            if (action.error) {
                
                return {
                    ...state,
                    toggleError: action.error,
                    toggleLoading: false
                }
            }

            break;

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

        case FAVORITES_RESET_TICKETS:
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
            
            break;
    }

    return state;
}

