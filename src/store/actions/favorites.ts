import { IEventShowcaseEvent } from "../../models/interfaces/eventShowcase/event";

export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';

export const toggleFavorites = (addedEvent: IEventShowcaseEvent) => {

    return { type: TOGGLE_FAVORITES, addedEvent };
}
