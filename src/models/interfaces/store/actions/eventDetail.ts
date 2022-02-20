import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IEventDetailActions {
    type: string;
    eventDetail: IEventShowcaseEvent;
    error: string;
}