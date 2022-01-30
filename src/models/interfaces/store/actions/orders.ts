import { IOrder } from '../../order/order';

export interface IOrdersActions {
    type: string;
    orders: Array<IOrder>;
}