import { IFavoriteEvent } from './../../favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface ICartState {
    cartItems: Array<IEventShowcaseEvent | IFavoriteEvent | null>;
}