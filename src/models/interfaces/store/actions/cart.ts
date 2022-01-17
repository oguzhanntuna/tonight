import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface ICartAction {
    type: string;
    addedEvent: IEventShowcaseEvent;
}