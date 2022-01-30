import { IPurchasedTicket } from '../purchasedTicket/purchasedTicket';

export interface IOrder {
    purchasedTickets: Array<IPurchasedTicket> 
    date: string;
}