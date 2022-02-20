import { IFavoriteEvent } from './../../favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IRecentlyAddedEventsActions {
    type: string;
    events: Array<IEventShowcaseEvent>;
    eventData: IEventShowcaseEvent | IFavoriteEvent | null;
    error: string;
}