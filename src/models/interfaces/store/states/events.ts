import { EventShowcaseEvent } from "../../../eventShowcase/event";

export interface IEventsState {
    allEvents: Array<EventShowcaseEvent>;
    buyNowEvents: Array<EventShowcaseEvent>;
    recentlyAddedEvents: Array<EventShowcaseEvent>;
    thisWeekEvents: Array<EventShowcaseEvent>;
    selectedEvent: EventShowcaseEvent | null;
    activeEventIds: Array<number | undefined>;
}