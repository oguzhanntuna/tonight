import { ICartEvent } from '../../cartEvent/cartEvent';

export interface ICartState {
    cartItems: Array<ICartEvent>;
}