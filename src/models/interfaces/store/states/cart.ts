import { ICartEvent } from '../../cartEvent/cartEvent';

export interface ICartState {
    cartItems: Array<ICartEvent>;
    ticketCount: number;
    fetchLoading: boolean;
    fetchError: string | null;
}