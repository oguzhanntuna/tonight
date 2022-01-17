import { IEventShowcaseEvent } from "../../eventShowcase/eventShowcase";

export interface ICartState {
    cartItems: Array<IEventShowcaseEvent | null>;
}