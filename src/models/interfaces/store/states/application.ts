import { ISliderState } from './slider';
import { IEventDetailState } from './eventDetail';
import { IBuyNowEventsState } from './buyNowEvents';
import { IRecentlyAddedEventsState } from './recentlyAddedEvents';
import { IOrdersState } from './orders';
import { IToastMessageState } from './toastMessage';
import { ICartState } from "./cart";
import { IFavoritesState } from "./favorites";
import { IAuthState } from './auth';
import { IThisWeekEventsState } from './thisWeekEvents';

export interface IApplicationState {
    cart: ICartState;
    favorites: IFavoritesState;
    auth: IAuthState;
    toastMessage: IToastMessageState;
    orders: IOrdersState;
    thisWeekEvents: IThisWeekEventsState;
    recentlyAddedEvents: IRecentlyAddedEventsState;
    buyNowEvents: IBuyNowEventsState;
    eventDetail: IEventDetailState;
    slider: ISliderState
}