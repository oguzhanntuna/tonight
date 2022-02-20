import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IRecentlyAddedEventsState {
    events: Array<IEventShowcaseEvent>;
    loading: boolean;
    error: string | null;
}