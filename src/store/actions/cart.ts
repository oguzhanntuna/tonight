import { IFavoriteEvent } from './../../models/interfaces/favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/eventShowcase";
import { ICartAction } from "../../models/interfaces/store/actions/cart";

export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (addedEvent: IEventShowcaseEvent | IFavoriteEvent): ICartAction => {

    return { type: ADD_TO_CART, addedEvent };
};