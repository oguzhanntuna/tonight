import { IEventShowcaseEvent } from "../../eventShowcase/event";

export interface IFavoritesAction {
    type: string;
    addedEvent: IEventShowcaseEvent;
}