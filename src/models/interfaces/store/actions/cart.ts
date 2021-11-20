import { IEventShowcaseEvent } from "../../eventShowcase/event";

export interface ICartAction {
    type: string;
    addedEvent: IEventShowcaseEvent;
}