import { IFavoriteEvent } from '../../favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IBuyNowEventsActions {
    type: string;
    events: Array<IEventShowcaseEvent>;
    eventData: IEventShowcaseEvent | IFavoriteEvent | null;
    error: string;
}