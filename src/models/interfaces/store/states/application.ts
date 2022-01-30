import { IMyTicketsState } from './myTickets';
import { IToastMessageState } from './toastMessage';
import { ICartState } from "./cart";
import { IEventsState } from "./events";
import { IFavoritesState } from "./favorites";
import { IAuthState } from './auth';

export interface IApplicationState {
    events: IEventsState;
    cart: ICartState;
    favorites: IFavoritesState;
    auth: IAuthState;
    toastMessage: IToastMessageState;
    myTickets: IMyTicketsState;
}