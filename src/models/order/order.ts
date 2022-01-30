import { IPurchasedTicket } from "../interfaces/purchasedTicket/purchasedTicket";

export class Order {
    constructor(
        public purchasedTickets: Array<IPurchasedTicket>,
        public date: string
    ) {
        this.purchasedTickets = purchasedTickets;
        this.date = date;
    }
}