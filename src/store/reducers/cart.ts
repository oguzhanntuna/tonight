import { ICartAction } from '../../models/interfaces/store/actions/cart';
import { ICartState } from '../../models/interfaces/store/states/cart';

import { ADD_TO_CART, UPDATE_ITEM_IN_CART } from '../actions/cart';

const initialState: ICartState = {
    cartItems: []
}

export const cartReducer = (state = initialState, action: ICartAction): ICartState => {
    switch(action.type) {
        case ADD_TO_CART:
            const { addedEvent } = action;

            return {
                ...state,
                cartItems: [ ...state.cartItems, addedEvent ]
            };

        case UPDATE_ITEM_IN_CART: 
            const { cartItems } = state;
            const { updatedEvent } = action;

            const itemIndex = cartItems.findIndex(item => item?.id === updatedEvent.id);

            const updatedCartItems = [ ...cartItems ];
            updatedCartItems[itemIndex] = updatedEvent;

            return {
                ...state,
                cartItems: updatedCartItems
            }
    }

    return state;
}