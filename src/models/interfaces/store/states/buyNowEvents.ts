import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IBuyNowEventsState {
    events: Array<IEventShowcaseEvent>;
    loading: boolean;
    error: string | null;
}