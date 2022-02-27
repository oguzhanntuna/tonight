import { ICartEvent } from '../../cartEvent/cartEvent';

export interface ICartAction {
    type: string;
    addedEvent: ICartEvent;
    updatedEvent: ICartEvent;
    cartEvents: Array<ICartEvent>;
    ticketCount: number;
    fetchError: string;
    addToCartError: string;
}