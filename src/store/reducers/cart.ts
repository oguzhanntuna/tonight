import { ICartAction } from '../../models/interfaces/store/actions/cart';
import { ICartState } from '../../models/interfaces/store/states/cart';

import { ADD_TO_CART, FETCH_CART, UPDATE_ITEM_IN_CART } from '../actions/cart';

const initialState: ICartState = {
    cartItems: [],
    ticketCount: 0
}

export const cartReducer = (state = initialState, action: ICartAction): ICartState => {
    switch(action.type) {
        case FETCH_CART:

            if (action.cartEvents) {

                return {
                    ...state,
                    cartItems: action.cartEvents,
                    ticketCount: action.ticketCount
                }
            }

        break;

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