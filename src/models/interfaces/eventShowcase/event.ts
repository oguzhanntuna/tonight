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
}

export class EventShowcaseEvent{
    constructor(
        public id: number, 
        public title: string, 
        public image: string, 
        public location: string, 
        public date: string, 
        public normalTicket: IEventShowCaseTicket,
        public vipTicket: IEventShowCaseTicket
    ) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.location = location;
        this.date = date;
        this.normalTicket = normalTicket;
        this.vipTicket = vipTicket;
    }
}