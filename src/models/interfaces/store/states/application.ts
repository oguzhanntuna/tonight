import { ICartState } from "./cart";
import { IEventsState } from "./events";
import { IFavoritesState } from "./favorites";

export interface IApplicationState {
    events: IEventsState;
    cart: ICartState;
    favorites: IFavoritesState;
}