import { IEventShowcaseEvent } from "../../eventShowcase/event";

export interface IEventsState {
    allEvents: Array<IEventShowcaseEvent>;
    buyNowEvents: Array<IEventShowcaseEvent>
    recentlyAddedEvents: Array<IEventShowcaseEvent>
    thisWeekEvents: Array<IEventShowcaseEvent>
    activeEventIds: Array<number | undefined>;
}