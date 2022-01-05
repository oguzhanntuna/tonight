import { IEventShowcaseEvent } from "../../eventShowcase/event";

export interface IEventsAction {
    type: string;
    allEvents?: Array<IEventShowcaseEvent>;
    buyNowEvents?: Array<IEventShowcaseEvent>;
    recentlyAddedEvents?: Array<IEventShowcaseEvent>;
    thisWeekEvents?: Array<IEventShowcaseEvent>;
    eventDetail?: IEventShowcaseEvent;
    eventData?: IEventShowcaseEvent;
}