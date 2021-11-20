import { ICartAction } from '../../models/interfaces/store/actions/cart';
import { ICartState } from '../../models/interfaces/store/states/cart';

import { ADD_TO_CART } from '../actions/cart';

const initialState: ICartState = {
    cartItems: []
}

export const cartReducer = (state = initialState, action: ICartAction) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedTicket = action.addedEvent;

            return {
                ...state,
                cartItems: [ ...state.cartItems, addedTicket ]
            };
    }

    return state;
}