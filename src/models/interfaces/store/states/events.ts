import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IEventsState {
    allEvents: Array<IEventShowcaseEvent>;
    buyNowEvents: Array<IEventShowcaseEvent>;
    recentlyAddedEvents: Array<IEventShowcaseEvent>;
    thisWeekEvents: Array<IEventShowcaseEvent>;
    eventDetail: IEventShowcaseEvent | null;
}