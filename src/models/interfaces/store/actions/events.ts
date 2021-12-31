import { EventShowcaseEvent } from "../../../eventShowcase/event";

export interface IEventsAction {
    type: string;
    allEvents?: Array<EventShowcaseEvent>;
    buyNowEvents?: Array<EventShowcaseEvent>;
    recentlyAddedEvents?: Array<EventShowcaseEvent>;
    thisWeekEvents?: Array<EventShowcaseEvent>;
    eventDetail?: EventShowcaseEvent;
    eventId?: number;
}