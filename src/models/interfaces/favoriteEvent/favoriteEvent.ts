import { IEventShowCaseTicket } from "../eventShowcase/eventShowcase";

export type uniqueId = string;

export interface IFavoriteEvent {
    id: number;
    title: string;
    imageUrl: string;
    location: string;
    date: string;
    url: string;
    description: Array<string>;
    normalTicket: IEventShowCaseTicket;
    vipTicket: IEventShowCaseTicket;
    totalPrice: number;
    moduleType: string;
    uniqueId: uniqueId;
}