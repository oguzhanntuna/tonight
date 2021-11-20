import { IEventShowcaseEvent } from "../../eventShowcase/event";

export interface IEventsState {
    availableEvents: Array<IEventShowcaseEvent>
    activeEventIds: Array<number | undefined>
}