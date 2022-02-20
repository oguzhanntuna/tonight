import { IFavoriteEvent } from '../../favoriteEvent/favoriteEvent';
import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IEventTicketsActions {
    type: string;
    eventData: IEventShowcaseEvent | IFavoriteEvent | null;
}