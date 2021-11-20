import { ADD_TO_CART } from '../actions/cart';
import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/event";

interface ICartState {
    cartItems: Array<IEventShowcaseEvent | undefined>;
}

const initialState: ICartState = {
    cartItems: []
}

export const cartReducer = (state = initialState, action: any) => {
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