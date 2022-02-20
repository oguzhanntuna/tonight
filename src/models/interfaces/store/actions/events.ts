import { IFavoriteEvent } from './../../favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IEventsAction {
    type: string;
    allEvents?: Array<IEventShowcaseEvent>;
    eventDetail?: IEventShowcaseEvent;
    eventData?: IEventShowcaseEvent | IFavoriteEvent | null;
}