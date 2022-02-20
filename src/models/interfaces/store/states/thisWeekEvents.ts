import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IThisWeekEventsState {
    events: Array<IEventShowcaseEvent>;
    loading: boolean;
    error: string | null;
}