import { IMyTicketEvent } from './../../myTickets/myTickets';

export interface IMyTicketsAction {
    type: string;
    purchasedEvents: Array<IMyTicketEvent>;
    myTickets: Array<IMyTicketEvent>;
}