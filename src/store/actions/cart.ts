import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/event";

export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (addedEvent: IEventShowcaseEvent) => {

    return { type: ADD_TO_CART, addedEvent };
};