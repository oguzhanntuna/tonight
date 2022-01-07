import { IEventShowcaseEvent } from "../../eventShowcase/event";

export interface ICartState {
    cartItems: Array<IEventShowcaseEvent | null>;
}