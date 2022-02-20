import { IFavoriteEvent } from './../../favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IThisWeekEventsAction {
    type: string;
    events: Array<IEventShowcaseEvent>;
    eventData: IEventShowcaseEvent | IFavoriteEvent | null;
    error: string;
}