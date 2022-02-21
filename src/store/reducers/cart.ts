import { ICartAction } from '../../models/interfaces/store/actions/cart';
import { ICartState } from '../../models/interfaces/store/states/cart';

import { 
    ADD_TO_CART, 
    RESET_CART,
    FETCH_CART_FAIL, 
    FETCH_CART_START, 
    FETCH_CART_SUCCESS, 
    UPDATE_ITEM_IN_CART 
} from '../actions/cart';

const initialState: ICartState = {
    cartItems: [],
    ticketCount: 0,
    fetchLoading: false,
    fetchError: null
}

export const cartReducer = (state = initialState, action: ICartAction): ICartState => {
    switch(action.type) {
        case RESET_CART:

            return {
                ...state,
                cartItems: [],
                ticketCount: 0
            }

        case FETCH_CART_START:

            return {
                ...state,
                fetchLoading: true,
                fetchError: null
            }

        case FETCH_CART_SUCCESS:

            return {
                ...state,
                cartItems: action.cartEvents,
                ticketCount: action.ticketCount,
                fetchLoading: false,
                fetchError: null
            }

        case FETCH_CART_FAIL:

            return {
                ...state,
                fetchLoading: false,
                fetchError: action.fetchError
            }

        case ADD_TO_CART:
            const { addedEvent } = action;

            return {
                ...state,
                cartItems: [ ...state.cartItems, addedEvent ],
                ticketCount: state.ticketCount + action.ticketCount
            };

        case UPDATE_ITEM_IN_CART: 
            const { cartItems } = state;
            const { updatedEvent } = action;

            const itemIndex = cartItems.findIndex(item => item?.id === updatedEvent.id);

            const updatedCartItems = [ ...cartItems ];
            updatedCartItems[itemIndex] = updatedEvent;

            return {
                ...state,
                cartItems: updatedCartItems,
                ticketCount: state.ticketCount + action.ticketCount
            }
    }

    return state;
}