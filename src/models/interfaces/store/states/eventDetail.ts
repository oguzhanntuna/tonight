import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface IEventDetailState {
    event: IEventShowcaseEvent | null;
    loading: boolean;
    error: string | null;
}