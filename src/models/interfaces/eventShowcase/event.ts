export interface IEventShowCaseTicket {
    type: string;
    title: string;
    price: number;
    count: number;
}

export interface IEventShowcaseEvent {
    id: number;
    title: string;
    image: string;
    location: string;
    date: string;
    normalTicket: IEventShowCaseTicket;
    vipTicket: IEventShowCaseTicket;
    totalPrice: number
}