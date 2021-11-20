import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/event";
import { ICartAction } from "../../models/interfaces/store/actions/cart";

export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (addedEvent: IEventShowcaseEvent): ICartAction => {

    return { type: ADD_TO_CART, addedEvent };
};