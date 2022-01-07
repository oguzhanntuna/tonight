import { IEventShowcaseEvent } from "../../eventShowcase/event";

export interface IFavoritesState {
    favoriteEvents: Array<IEventShowcaseEvent | null>;
}