import { IBuyNowEventsState } from './buyNowEvents';
import { IRecentlyAddedEventsState } from './recentlyAddedEvents';
import { IOrdersState } from './orders';
import { IToastMessageState } from './toastMessage';
import { ICartState } from "./cart";
import { IEventsState } from "./events";
import { IFavoritesState } from "./favorites";
import { IAuthState } from './auth';
import { IThisWeekEventsState } from './thisWeekEvents';

export interface IApplicationState {
    events: IEventsState;
    cart: ICartState;
    favorites: IFavoritesState;
    auth: IAuthState;
    toastMessage: IToastMessageState;
    orders: IOrdersState;
    thisWeekEvents: IThisWeekEventsState;
    recentlyAddedEvents: IRecentlyAddedEventsState;
    buyNowEvents: IBuyNowEventsState;
}