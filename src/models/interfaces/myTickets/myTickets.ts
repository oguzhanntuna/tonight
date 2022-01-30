import { IEventShowCaseTicket } from "../eventShowcase/eventShowcase";

export type uniqueId = string;

export interface IMyTicketEvent {
    id: number;
    title: string;
    imageUrl: string;
    location: string;
    date: string;
    url: string;
    normalTicket: IEventShowCaseTicket;
    vipTicket: IEventShowCaseTicket;
    totalPrice: number;
}